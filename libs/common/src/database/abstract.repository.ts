import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    // we will generate _id from newly created document
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery');
      throw new NotFoundException('Document was not found');
    }

    return document;

    // it returns unhydrated document as in hydrated one their are some specific value
  }
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndUpdate(
    _id: string,
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model
      .findOneAndUpdate({ _id }, filterQuery)
      .lean<TDocument>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
