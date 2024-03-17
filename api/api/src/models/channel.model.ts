import {Entity, model, property, hasMany} from '@loopback/repository';
import { ObjectId } from 'mongoose';
import { Item } from './item.model'

@model()
export class Channel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: ObjectId;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

    @hasMany(() => Item)
  item?: Item[];

  constructor(data?: Partial<Channel>) {
    super(data);
  }
}

export interface ChannelRelations {
  // describe navigational properties here
}

export type ChannelWithRelations = Channel & ChannelRelations;
