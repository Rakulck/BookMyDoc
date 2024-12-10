import { FirebaseService } from '@app/firebase/firebase.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';
// import Stripe from 'stripe';
import { BookingFilterDto } from '@app/booking/dto/filters.dto';
import {
  BookingCreateDto,
  BookingUpdateDto,
  BookingDto,
} from '@app/booking/dto/booking.dto';
import { IUnsafeObject } from '@app/common/types';
import { IBookingStatus, IPaymentStatus } from './type';
import { CreatePaymentDto } from './dto/payment.dto';
import { IRole } from '@app/common/types/type';
import { FirebaseNotificationService } from '@app/firebase/firebase-notification.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class BookingService {
  // stripe: Stripe;
  logger: Logger;
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly firebaseNotification: FirebaseNotificationService,
  ) {
    // this.stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));
    this.logger = new Logger(this.constructor.name);
  }

  async getBookings(filters: BookingFilterDto, userRole: IRole = IRole.ADMIN) {
    const fireStore = this.firebaseService.getFireStore();
    let bookingsRef: any = fireStore.collection(
      this.firebaseService.collections.bookings,
    );

    let orderBy;
    if (['asc', 'desc'].includes(filters?.order_by)) {
      orderBy = filters?.order_by;
      delete filters.order_by;
    }

    if (filters) {
      for (const filter in filters) {
        bookingsRef = bookingsRef.where(filter, '==', filters[filter]);
      }
    }

    const bookingsDocs = await bookingsRef.get();

    const results = await Promise.all(
      bookingsDocs.docs.map(async (doc: any) => {
        const booking = doc.data();
        let doctor = null;
        if (booking?.doctor && userRole == IRole.CUSTOMER) {
          const doctorSnap = await booking.doctor.get();
          doctor = doctorSnap.data();
          if (userRole == IRole.CUSTOMER) {
            delete doctor?.email;
            delete doctor?.phone;
            delete doctor?.notification_tokens;
          }
        }
        let customer = null;
        if (booking?.customer && userRole == IRole.DOCTOR) {
          const customerSnap = await booking.customer.get();
          customer = customerSnap.data();
        }
        let service = null;
        if (booking?.service) {
          const serviceSnap = await booking.service.get();
          service = serviceSnap.data();
        }
        let slot = null;
        if (booking?.slot) {
          const slotSnap = await booking.slot.get();
          slot = slotSnap.data();
        }

        return {
          ...booking,
          doctor,
          customer,
          service,
          slot,
        };
      }),
    );

    if (orderBy) {
      return results.sort((a, b) => {
        if (orderBy === 'asc') {
          return new Date(a.date).getTime() - new Date(b?.date).getTime();
        }
        if (orderBy === 'desc') {
          return new Date(b.date).getTime() - new Date(a?.date).getTime();
        }
      });
    }

    return results;
  }

  async getSingleBooking(
    bookingId: string,
    filters: BookingFilterDto = {},
    userRole: IRole = IRole.ADMIN,
  ) {
    const fireStore = this.firebaseService.getFireStore();
    const bookingsDocs: any = await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(bookingId)
      .get();

    if (!bookingsDocs?.exists) {
      throw new HttpException('No booking found', HttpStatus.BAD_REQUEST);
    }

    const booking = bookingsDocs.data();

    if (
      (filters.customer_id && booking?.customer_id !== filters.customer_id) ||
      (filters.doctor_id && booking?.doctor_id !== filters.doctor_id)
    ) {
      throw new HttpException('Invalid booking', HttpStatus.BAD_REQUEST);
    }

    let doctor = null;
    if (booking?.doctor && userRole == IRole.CUSTOMER) {
      const doctorSnap = await booking.doctor.get();
      doctor = doctorSnap.data();
      if (userRole == IRole.CUSTOMER) {
        delete doctor?.email;
        delete doctor?.phone;
        delete doctor?.notification_tokens;
      }
    }
    let customer = null;
    if (booking?.customer && userRole == IRole.DOCTOR) {
      const customerSnap = await booking.customer.get();
      customer = customerSnap.data();
    }
    let service = null;
    if (booking?.service) {
      const serviceSnap = await booking.service.get();
      service = serviceSnap.data();
    }
    let slot = null;
    if (booking?.slot) {
      const slotSnap = await booking.slot.get();
      slot = slotSnap.data();
    }

    return {
      ...booking,
      doctor,
      customer,
      service,
      slot,
    };
  }

  async createBooking(payload: BookingCreateDto, user: any) {
    const fireStore = this.firebaseService.getFireStore();

    const profile = (
      await fireStore
        .collection(this.firebaseService.collections.profiles)
        .doc(payload?.customer_id)
        .get()
    ).data();

    if (!profile?.uid) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const service = (
      await fireStore
        .collection(this.firebaseService.collections.services)
        .doc(payload?.service_id)
        .get()
    ).data();
    if (!service?.service_id) {
      throw new HttpException('Service not found', HttpStatus.BAD_REQUEST);
    }

    const doctor = (
      await fireStore
        .collection(this.firebaseService.collections.profiles)
        .doc(payload?.doctor_id)
        .get()
    ).data();

    if (!doctor?.uid) {
      throw new HttpException('Doctor not found', HttpStatus.BAD_REQUEST);
    }

    const payloadDate = new Date(payload?.date);
    const bookingDate = `${payloadDate.getFullYear()}-${+payloadDate.getMonth() + 1}-${payloadDate.getDate()}`;
    let paymentStatus =
      user?.role === IRole.ADMIN && payload?.payment?.status
        ? payload?.payment?.status
        : IPaymentStatus.PENDING;

    if (
      user?.role !== IRole.ADMIN &&
      (payload?.payment?.transaction_id || payload?.payment?.order_id)
    ) {
      const validPayment = validatePaymentVerification(
        {
          order_id: payload?.payment?.order_id,
          payment_id: payload?.payment?.transaction_id,
        },
        payload?.payment?.signature,
        process.env.RAZORPAY_API_SECRET,
      );
      if (!validPayment) {
        throw new HttpException(
          'Payment verification failed',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }
      paymentStatus = IPaymentStatus.COMPLETED;
    }

    const createPayload = {
      booking_id: uuidv7(),
      customer_id: payload?.customer_id,
      doctor_id: payload?.doctor_id,
      date: bookingDate,
      service_id: payload?.service_id,
      slot_id: payload?.slot_id,
      status: IBookingStatus.PENDING,
      payment: {
        ephemeralId: payload?.payment?.ephemeralId || '',
        transaction_id: payload?.payment?.transaction_id || '',
        order_id: payload?.payment?.order_id || '',
        signature: payload?.payment?.signature || '',
        amount:
          user?.role === IRole.ADMIN && payload?.payment?.amount
            ? payload?.payment?.amount
            : service?.price_amount || 0,
        status: paymentStatus,
      },
      history: {
        created_at: new Date().toISOString(),
        created_by: user?.uid,
        created_by_role: user?.role,
        created_by_name: user?.name,
        confirmed_at: '',
        confirmed_by: '',
        confirmed_by_role: '',
        confirmed_by_name: '',
        canceled_at: '',
        canceled_by: '',
        canceled_by_role: '',
        canceled_by_name: '',
        completed_at: '',
        completed_by: '',
        completed_by_role: '',
        completed_by_name: '',
      },
    } as IUnsafeObject<any>;

    if (createPayload?.doctor_id) {
      createPayload.doctor = fireStore.doc(
        `${this.firebaseService.collections.profiles}/${createPayload?.doctor_id}`,
      );
    }

    if (createPayload?.customer_id) {
      createPayload.customer = fireStore.doc(
        `${this.firebaseService.collections.profiles}/${createPayload?.customer_id}`,
      );
    }

    if (createPayload?.slot_id) {
      createPayload.slot = fireStore.doc(
        `${this.firebaseService.collections.availability_slots}/${createPayload?.slot_id}`,
      );
    }

    if (createPayload?.service_id) {
      createPayload.service = fireStore.doc(
        `${this.firebaseService.collections.services}/${createPayload?.service_id}`,
      );
    }

    createPayload.created_at = new Date().toISOString();

    await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(createPayload.booking_id)
      .create(createPayload);

    this.logger.log(createPayload, 'Booking Created');

    // send booking notification
    await this.firebaseNotification.sendNotificationByTopic(
      createPayload.customer_id,
      createPayload.doctor_id,
      (receiver: IUnsafeObject<any>, sender: IUnsafeObject<any>) => {
        return this.prepareBookingNotification(
          receiver,
          sender,
          createPayload,
          {},
        );
      },
    );

    return true;
  }

  async updateBooking(
    bookingId: string,
    filters: BookingFilterDto,
    payload: BookingUpdateDto,
    user: any,
  ) {
    const fireStore = this.firebaseService.getFireStore();
    const bookingsDocs = await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(bookingId)
      .get();

    if (!bookingsDocs?.exists) {
      throw new HttpException('No booking found', HttpStatus.BAD_REQUEST);
    }
    const bookingData = bookingsDocs.data() as BookingDto;

    if (
      (filters?.doctor_id && filters?.doctor_id !== bookingData.doctor_id) ||
      (filters?.customer_id && filters?.customer_id !== bookingData.customer_id)
    ) {
      throw new HttpException('Invalid booking', HttpStatus.BAD_REQUEST);
    }

    if (
      bookingData?.status == IBookingStatus.COMPLETED &&
      [IRole.CUSTOMER, IRole.DOCTOR].includes(user?.role)
    ) {
      throw new HttpException(
        `Its already ${IBookingStatus.COMPLETED}. So you can not updated it.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      user?.role === IRole.CUSTOMER &&
      payload.status == IBookingStatus.CANCELED &&
      bookingData?.status == IBookingStatus.CANCELED
    ) {
      throw new HttpException(
        `Its already ${IBookingStatus.CANCELED}. So you can not ${IBookingStatus.CANCELED} it again.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatePayload = {
      date: payload?.date || bookingData?.date,
      service_id: payload?.service_id || bookingData?.service_id,
      slot_id: payload?.slot_id || bookingData?.slot_id,
      status: payload?.status || bookingData?.status,
    } as IUnsafeObject;

    if (payload?.payment) {
      updatePayload.payment = {
        transaction_id:
          user?.role === IRole.ADMIN && payload?.payment?.transaction_id
            ? payload?.payment?.transaction_id
            : bookingData?.payment?.transaction_id || '',
        amount:
          user?.role === IRole.ADMIN && payload?.payment?.amount
            ? payload?.payment?.amount
            : bookingData?.payment?.amount || 0,
        status:
          user?.role === IRole.ADMIN && payload?.payment?.status
            ? payload?.payment?.status
            : bookingData?.payment?.status || IPaymentStatus.PENDING,
      };
    }

    const history = bookingData?.history || {};
    if (payload?.status && payload?.status == IBookingStatus.CONFIRMED) {
      updatePayload.history = {
        ...history,
        confirmed_at: new Date().toISOString(),
        confirmed_by: user?.uid,
        confirmed_by_role: user?.role,
        confirmed_by_name: user?.name,
      };
    }
    if (payload?.status && payload?.status == IBookingStatus.CANCELED) {
      updatePayload.history = {
        ...history,
        canceled_at: new Date().toISOString(),
        canceled_by: user?.uid,
        canceled_by_role: user?.role,
        canceled_by_name: user?.name,
      };
    }
    if (payload?.status && payload?.status == IBookingStatus.COMPLETED) {
      updatePayload.history = {
        ...history,
        completed_at: new Date().toISOString(),
        completed_by: user?.uid,
        completed_by_role: user?.role,
        completed_by_name: user?.name,
      };
    }

    if (payload?.slot_id) {
      updatePayload.slot = fireStore.doc(
        `${this.firebaseService.collections.availability_slots}/${updatePayload?.slot_id}`,
      );
    }

    if (payload?.service_id) {
      updatePayload.service = fireStore.doc(
        `${this.firebaseService.collections.services}/${updatePayload?.service_id}`,
      );
    }

    updatePayload.updated_at = new Date().toISOString();

    await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(bookingData?.booking_id)
      .set(updatePayload, { merge: true });

    this.logger.log(updatePayload, 'Booking Updated');

    // send booking notification
    await this.firebaseNotification.sendNotificationByToken(
      bookingData.customer_id,
      bookingData.doctor_id,
      (receiver: IUnsafeObject<any>, sender: IUnsafeObject<any>) => {
        return this.prepareBookingNotification(
          receiver,
          sender,
          updatePayload,
          bookingData,
        );
      },
    );

    return true;
  }

  async addBookingReview(
    bookingId: string,
    filters: BookingFilterDto,
    payload: ReviewDto,
    user: any,
  ) {
    const fireStore = this.firebaseService.getFireStore();
    const bookingsDocs = await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(bookingId)
      .get();

    if (!bookingsDocs?.exists) {
      throw new HttpException('No booking found', HttpStatus.NOT_FOUND);
    }
    const bookingData = bookingsDocs.data() as BookingDto;

    if (
      (filters?.doctor_id && filters?.doctor_id !== bookingData.doctor_id) ||
      (filters?.customer_id && filters?.customer_id !== bookingData.customer_id)
    ) {
      throw new HttpException('Invalid booking', HttpStatus.BAD_REQUEST);
    }

    if (bookingData?.status !== IBookingStatus.COMPLETED) {
      throw new HttpException(
        `Its not ${IBookingStatus.COMPLETED}. So you can not review it.`,
        HttpStatus.MISDIRECTED,
      );
    }

    if (bookingData?.review?.datetime && user?.role === IRole.CUSTOMER) {
      throw new HttpException(
        `Your already rated it. So you can not rate again.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!payload?.comment && !payload?.rating) {
      throw new HttpException(
        'Review or Ratting is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatePayload = {
      review: {
        comment: payload?.comment,
        rating: payload?.rating,
        datetime: new Date().toISOString(),
      },
    } as IUnsafeObject;

    await fireStore
      .collection(this.firebaseService.collections.bookings)
      .doc(bookingData?.booking_id)
      .set(updatePayload, { merge: true });

    const doctorDocs = await fireStore
      .collection(this.firebaseService.collections.profiles)
      .doc(bookingData.doctor_id)
      .get();

    if (doctorDocs?.exists) {
      const doctorProfile = doctorDocs.data();
      const ratingsData = Array.isArray(doctorProfile?.ratings)
        ? doctorProfile?.ratings
        : [];
      ratingsData.push(payload?.rating);
      await fireStore
        .collection(this.firebaseService.collections.profiles)
        .doc(bookingData.doctor_id)
        .set({ ratings: ratingsData }, { merge: true });
    }

    this.logger.log('Booking Rated', updatePayload);
    return true;
  }

  prepareBookingNotification(
    receiver: IUnsafeObject<any>,
    sender: IUnsafeObject<any>,
    currentData: IUnsafeObject<any> = {},
    oldData: IUnsafeObject<any> = {},
  ) {
    currentData = {
      ...oldData,
      ...currentData,
    };
    let actions = [];
    if (
      [IBookingStatus.PENDING, IBookingStatus.CONFIRMED].includes(
        currentData?.status,
      )
    ) {
      actions = ['reschedule', 'cancel'];
    }
    if ([IBookingStatus.CANCELED].includes(currentData?.status)) {
      actions = ['reschedule'];
    }
    if ([IBookingStatus.COMPLETED].includes(currentData?.status)) {
      actions = ['rate'];
    }

    const action_type = oldData?.booking_id ? 'Updated' : 'Created';
    let title = `Booking ${action_type}`;
    let body = `${receiver?.display_name} your booking with ${sender?.display_name} has been ${action_type.toLocaleLowerCase()}`;

    if (
      oldData?.date !== currentData.date ||
      oldData?.slot_id !== currentData.slot_id
    ) {
      title = `Booking Schedule ${action_type}`;
      body = `${receiver?.display_name} your booking with ${sender?.display_name} has been rescheduled to ${currentData?.date}`;
    }
    if (oldData?.status !== currentData.status) {
      title = `Booking Status ${action_type}`;
      body =
        currentData.status === IBookingStatus.COMPLETED
          ? `${receiver?.display_name} your booking with ${sender?.display_name} has been ${currentData?.status}. Please let us know how the check-up went.`
          : `${receiver?.display_name} your booking with ${sender?.display_name} on ${currentData?.date} has been ${currentData?.status}.`;
    }
    return {
      notification: {
        title,
        body,
      },
      context: {
        booking_id: currentData?.booking_id,
        doctor_id: currentData?.doctor_id,
        customer_id: currentData?.customer_id,
        type: `booking_${action_type.toLocaleLowerCase()}`,
        actions,
      },
    };
  }

  // async createBookingPayment2(payload: CreatePaymentDto) {
  //   const fireStore = this.firebaseService.getFireStore();
  //   const profile = (
  //     await fireStore
  //       .collection(this.firebaseService.collections.profiles)
  //       .doc(payload?.customer_id)
  //       .get()
  //   ).data();

  //   if (!profile) {
  //     throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  //   }

  //   const service = (
  //     await fireStore
  //       .collection(this.firebaseService.collections.services)
  //       .doc(payload?.service_id)
  //       .get()
  //   ).data();
  //   if (!service) {
  //     throw new HttpException('Service not found', HttpStatus.BAD_REQUEST);
  //   }

  //   let stripeCustomerId = profile?.stripe_id;
  //   if (!stripeCustomerId) {
  //     try {
  //       const customer = await this.stripe.customers.create({
  //         name: profile?.display_name,
  //         email: profile?.email,
  //         metadata: {
  //           uid: profile?.uid,
  //           user_name: profile?.user_name,
  //         },
  //       });
  //       stripeCustomerId = customer?.id;
  //       await fireStore
  //         .collection(this.firebaseService.collections.profiles)
  //         .doc(payload?.customer_id)
  //         .set({ stripe_id: stripeCustomerId }, { merge: true });
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(
  //         'create payment customer failed',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }

  //   const ephemeralKey = await this.stripe.ephemeralKeys.create(
  //     {
  //       customer: stripeCustomerId,
  //     },
  //     { apiVersion: '2024-09-30.acacia' },
  //   );

  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     amount: +service?.price_amount * 100,
  //     currency: 'usd',
  //     customer: stripeCustomerId,
  //     automatic_payment_methods: {
  //       enabled: true,
  //     },
  //     metadata: {
  //       customerId: profile.uid,
  //       doctorId: payload?.doctor_id,
  //       ephemeralId: ephemeralKey?.id,
  //     },
  //   });

  //   return {
  //     ephemeralId: ephemeralKey?.id,
  //     ephemeralKey: ephemeralKey?.secret,
  //     paymentIntent: paymentIntent.client_secret,
  //     customer: stripeCustomerId,
  //   };
  // }

  async createBookingPayment(payload: CreatePaymentDto) {
    const fireStore = this.firebaseService.getFireStore();
    const profile = (
      await fireStore
        .collection(this.firebaseService.collections.profiles)
        .doc(payload?.customer_id)
        .get()
    ).data();

    if (!profile) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const service = (
      await fireStore
        .collection(this.firebaseService.collections.services)
        .doc(payload?.service_id)
        .get()
    ).data();
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.BAD_REQUEST);
    }

    const paymentInstance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
    const result: any = await paymentInstance.orders.create({
      amount: +service?.price_amount * 100,
      currency: 'INR',
      receipt: profile.uid,
      partial_payment: false,
      notes: {
        serviceId: service?.service_id,
        customerId: profile.uid,
        doctorId: payload?.doctor_id,
      },
    });

    if (!result?.id) {
      this.logger.log(result, 'Payment order error');
      throw new HttpException(
        'Failed to generate order',
        HttpStatus.PAYMENT_REQUIRED,
      );
    }
    this.logger.log(result, 'Payment order result');

    return {
      key: process.env.RAZORPAY_API_KEY,
      order_id: result?.id,
      name: process.env.APP_NAME,
      amount: result?.amount,
      currency: result?.currency,
      description: service?.name,
      prefill: {
        email: profile?.email,
        contact: profile?.phone,
        name: profile?.display_name,
      },
      theme: {
        color: '#18A0FB',
      },
      notes: {
        orderId: result?.id,
        serviceId: service?.service_id,
        customerId: profile.uid,
        doctorId: payload?.doctor_id,
      },
    };
  }
}
