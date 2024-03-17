import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Channel} from '../models';
import {ChannelRepository} from '../repositories';
import { ObjectId } from 'mongoose';

export class ChannelController {
  constructor(
    @repository(ChannelRepository)
    public itemRepository : ChannelRepository,
  ) {}

  @post('/channel')
  @response(200, {
    description: 'Channel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Channel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {
            title: 'NewChannel',
            exclude: ['id'],
          }),
        },
      },
    })
    item: Omit<Channel, 'id'>,
  ): Promise<Channel> {
    return this.itemRepository.create(item);
  }

  @get('/channel/count')
  @response(200, {
    description: 'Channel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Channel) where?: Where<Channel>,
  ): Promise<Count> {
    return this.itemRepository.count(where);
  }

  @get('/channel')
  @response(200, {
    description: 'Array of Channel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Channel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Channel) filter?: Filter<Channel>,
  ): Promise<Channel[]> {
    return this.itemRepository.find(filter);
  }

  @patch('/channel')
  @response(200, {
    description: 'Channel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    item: Channel,
    @param.where(Channel) where?: Where<Channel>,
  ): Promise<Count> {
    return this.itemRepository.updateAll(item, where);
  }

  @get('/channel/{id}')
  @response(200, {
    description: 'Channel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Channel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: ObjectId,
    @param.filter(Channel, {exclude: 'where'}) filter?: FilterExcludingWhere<Channel>
  ): Promise<Channel> {
    return this.itemRepository.findById(id, filter);
  }

  @patch('/channel/{id}')
  @response(204, {
    description: 'Channel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: ObjectId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    item: Channel,
  ): Promise<void> {
    await this.itemRepository.updateById(id, item);
  }

  @put('/channel/{id}')
  @response(204, {
    description: 'Channel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: ObjectId,
    @requestBody() item: Channel,
  ): Promise<void> {
    await this.itemRepository.replaceById(id, item);
  }

  @del('/channel/{id}')
  @response(204, {
    description: 'Channel DELETE success',
  })
  async deleteById(@param.path.string('id') id: ObjectId): Promise<void> {
    await this.itemRepository.deleteById(id);
  }
}
