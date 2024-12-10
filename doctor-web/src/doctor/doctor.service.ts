import { FirebaseService } from '@app/firebase/firebase.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { v7 as uuidv7 } from 'uuid';
import { IRole } from '@app/common/types/type';
import { DoctorFilterDto } from './dto/filters.dto';
import { DoctorDto } from './dto/doctor.dto';
import { ServiceDto } from '@app/booking/dto/booking.dto';
import { AvailabilitySlot } from '@app/availability/dto/availability.dto';
import { IDay } from './type';

@Injectable()
export class DoctorService {
  constructor(private readonly firebaseService: FirebaseService) {}

  isFindFilterDoctor(data, filters) {
    // filter by availability
    if (filters?.availability && !data?.availability?.length) {
      return false;
    }

    // filter by name
    if (
      filters?.name &&
      !(data?.display_name?.toLocaleLowerCase() || '').includes(
        filters?.name?.trim()?.toLocaleLowerCase(),
      )
    ) {
      return false;
    }

    // filter by skills
    if (filters?.expertise && Array.isArray(data?.expertiseList)) {
      const hasExpertise = data?.expertiseList?.some((ex: string) =>
        (ex?.trim()?.toLocaleLowerCase() || '').includes(
          filters?.expertise?.trim()?.toLocaleLowerCase(),
        ),
      );
      if (!hasExpertise) {
        return false;
      }
    }
    return true;
  }

  isFindSearchDoctor(data, filters) {
    if (!filters?.search) {
      return true;
    }

    // filter by name
    if (
      filters?.search &&
      (data?.display_name?.toLocaleLowerCase() || '').includes(
        filters?.search?.trim()?.toLocaleLowerCase(),
      )
    ) {
      return true;
    }

    // filter by skills
    if (filters?.search && Array.isArray(data?.expertiseList)) {
      const hasExpertise = data?.expertiseList?.some((ex: string) =>
        (ex?.trim()?.toLocaleLowerCase() || '').includes(
          filters?.search?.trim()?.toLocaleLowerCase(),
        ),
      );
      if (hasExpertise) {
        return true;
      }
    }
    return false;
  }

  async getDoctors(filters?: DoctorFilterDto, userRole: IRole = IRole.ADMIN) {
    const fireStore = this.firebaseService.getFireStore();

    // get services
    const serviceData = {} as any;
    const serviceIds = [];
    const services = await fireStore
      .collection(this.firebaseService.collections.services)
      .get();
    services.docs.forEach((doc) => {
      const data = doc?.data();
      serviceData[data?.service_id] = data;
      if (
        (data?.name?.trim().toLocaleLowerCase() || '').includes(
          filters?.service?.trim()?.toLocaleLowerCase(),
        )
      ) {
        serviceIds.push(data?.service_id);
      }
    });

    // get doctors
    let doctorRef: any = fireStore.collection(
      this.firebaseService.collections.profiles,
    );
    doctorRef = doctorRef.where('role', '==', IRole.DOCTOR);
    if (filters?.service && serviceIds.length) {
      doctorRef = doctorRef.where('services', 'array-contains-any', serviceIds);
    }

    const doctorSnapshot = await doctorRef.get();
    const doctorResults = [];
    doctorSnapshot.docs.forEach((doc: any) => {
      const data = doc.data() as DoctorDto;

      if (!this.isFindFilterDoctor(data, filters)) {
        return;
      }

      if (!this.isFindSearchDoctor(data, filters)) {
        return;
      }

      // get availability
      if (!data?.availability) {
        data.availability = [];
      }
      if (data?.availabilitySlots) {
        try {
          data.availabilitySlots = JSON.parse(
            data.availabilitySlots as unknown as string,
          );
        } catch (error) {
          data.availabilitySlots = [];
        }
      }

      // get ratings
      if (
        !data.star_rating &&
        Array.isArray(data?.ratings) &&
        data?.ratings?.length
      ) {
        const total_ratings = (data?.ratings).reduce((p, c) => +p + +c, 0);
        data.star_rating = +parseFloat(
          String(total_ratings / data?.ratings?.length),
        ).toFixed(2);
        data.star_rating = data.star_rating > 5 ? 5 : data.star_rating;
      }

      if (!data.star_rating) {
        data.star_rating = Math.floor(Math.random() * 4);
        data.ratings = [data.star_rating];
      }

      // get doctor services
      if (Array.isArray(data?.services) && data?.services.length) {
        data.providingServices = data?.services.map(
          (serviceId) => serviceData[serviceId] ?? undefined,
        );
      }

      if (userRole !== IRole.ADMIN) {
        delete data?.email;
        delete data?.phone;
        delete data?.notification_tokens;
      }
      doctorResults.push(data);
    });

    if (filters?.limit) {
      // generate random data by shuffle
      let randomLimit =
        doctorResults.length < +filters?.limit
          ? +doctorResults.length
          : +filters?.limit;
      const doctorData = [];
      const checked = [];

      while (randomLimit > 0) {
        const randomIndex = Math.round(Math.random() * doctorResults.length);
        if (!checked.includes(randomIndex) && doctorResults[randomIndex]) {
          doctorData.push(doctorResults[randomIndex]);
          checked.push(randomIndex);
          --randomLimit;
        }
      }
      return doctorData;
    }

    return doctorResults;
  }

  async getDoctorDetails(doctorId: string, userRole: IRole = IRole.ADMIN) {
    const fireStore = this.firebaseService.getFireStore();

    // get doctors
    const doctorData = (
      await fireStore
        .collection(this.firebaseService.collections.profiles)
        .doc(doctorId)
        .get()
    ).data() as DoctorDto;
    if (doctorData?.role !== IRole.DOCTOR) {
      throw new HttpException('invalid doctor', HttpStatus.BAD_REQUEST);
    }

    // get services data
    if (doctorData?.services?.length) {
      const servicesRef = await fireStore
        .collection(this.firebaseService.collections.services)
        .where('service_id', 'in', doctorData.services)
        .get();
      doctorData.providingServices = servicesRef?.docs?.map(
        (doc: any) => doc?.data() as ServiceDto,
      );
    } else {
      doctorData.providingServices = [];
    }

    // get availability data
    const availabilityDays = {};
    const availabilitySnapshot = await fireStore
      .collection(this.firebaseService.collections.availability_slots)
      .where('uid', '==', doctorId)
      .get();
    doctorData.availabilitySlots = availabilitySnapshot.docs.map((doc) => {
      const data = doc?.data() as AvailabilitySlot;
      availabilityDays[data?.day] = data?.day;
      return data;
    });
    if (!doctorData?.availability) {
      doctorData.availability = Object.keys(availabilityDays) as IDay[];
    }

    // get ratings
    if (
      !doctorData.star_rating &&
      Array.isArray(doctorData?.ratings) &&
      doctorData?.ratings?.length
    ) {
      const ratings = (doctorData?.ratings).reduce((p, c) => +p + +c, 0);
      doctorData.star_rating = +parseFloat(
        String(ratings / doctorData?.ratings?.length),
      ).toFixed(2);
      doctorData.star_rating =
        doctorData.star_rating > 5 ? 5 : doctorData.star_rating;
    } else {
      doctorData.star_rating = Math.floor(Math.random() * 4);
      doctorData.ratings = [doctorData.star_rating];
    }

    if (userRole !== IRole.ADMIN) {
      delete doctorData?.email;
      delete doctorData?.phone;
      delete doctorData?.notification_tokens;
    }

    // get bookings
    const bookingsSnapshot = await fireStore
      .collection(this.firebaseService.collections.bookings)
      .where('doctor_id', '==', doctorId)
      .where('status', '==', 'completed')
      .limit(100)
      .get();
    const bookings = [];
    for (const bookingDoc of bookingsSnapshot.docs) {
      const booking = bookingDoc?.data();
      const bookingRefs = [];
      bookingRefs.push(booking?.customer ? booking.customer.get() : null);
      bookingRefs.push(booking?.service ? booking.service.get() : null);
      bookingRefs.push(booking?.slot ? booking.slot.get() : null);
      const refs = await Promise.all(bookingRefs);
      booking.customer = refs[0]?.exists ? refs[0]?.data() : {};
      booking.service = refs[1]?.exists ? refs[1]?.data() : {};
      booking.slot = refs[2]?.exists ? refs[2]?.data() : {};
      bookings.push(booking);
    }
    doctorData.bookings = bookings;

    return doctorData;
  }
}
