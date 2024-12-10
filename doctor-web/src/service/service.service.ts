import { Injectable } from '@nestjs/common';
import { ServiceDto } from './dto/create-service.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class ServiceService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * SERVICE CREATE SERVICE
   // region CREATE SERVICE
   * @param createServiceDto 
   * @returns 
   */
  async create(createServiceDto: ServiceDto) {
    try {
      const serviceRef = this.firebaseService
        .getFirestore()
        .collection('services')
        .doc();

      const serviceId = String(serviceRef.id || uuidv7());

      // Prepare the service data
      const serviceData = {
        service_id: serviceId,
        ...createServiceDto,
      };

      // Set the document with the prepared data
      await serviceRef.set(serviceData);

      return {
        message: 'Service created successfully',
        data: serviceData,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create service: ${error.message}`);
      } else {
        throw new Error('Failed to create service: Unknown error');
      }
    }
  }

  /**
   * Retrieves all services from Firestore
   // region GET ALL SERVICES
   * @returns A promise with the list of services
   */
  async findAll() {
    try {
      const servicesCollectionRef = this.firebaseService
        .getFirestore()
        .collection('services');

      const snapshot = await servicesCollectionRef.get();

      if (snapshot.empty) {
        return {
          message: 'No services found',
          data: [],
        };
      }

      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        message: 'Services retrieved successfully',
        data: services,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve services: ${error.message}`);
      } else {
        throw new Error('Failed to retrieve services: Unknown error');
      }
    }
  }

  /**
   * Delete service
   // region DELETE SERVICE
   * @param id 
   */
  async remove(id: number) {
    try {
      const serviceRef = this.firebaseService
        .getFirestore()
        .collection('services')
        .doc(id.toString());

      const serviceDoc = await serviceRef.get();

      if (!serviceDoc.exists) {
        throw new Error(`Service with ID ${id} not found`);
      }

      await serviceRef.delete();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to remove service: ${error.message}`);
      } else {
        throw new Error('Failed to remove service: Unknown error');
      }
    }
  }
}
