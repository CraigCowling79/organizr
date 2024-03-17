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
import {Item} from '../models';
import {ItemRepository} from '../repositories';
import { ObjectId } from 'mongoose';

export class ItemController {
  constructor(
    @repository(ItemRepository)
    public itemRepository : ItemRepository,
  ) {}

  @post('/item')
  @response(200, {
    description: 'Item model instance',
    content: {'application/json': {schema: getModelSchemaRef(Item)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItem',
            exclude: ['id'],
          }),
        },
      },
    })
    item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.itemRepository.create(item);
  }

  @get('/item/count')
  @response(200, {
    description: 'Item model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Item) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemRepository.count(where);
  }

  @get('/item')
  @response(200, {
    description: 'Array of Item model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Item, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Item) filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.itemRepository.find(filter);
  }

  @patch('/item')
  @response(200, {
    description: 'Item PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Item,
    @param.where(Item) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemRepository.updateAll(item, where);
  }

  @get('/item/{id}')
  @response(200, {
    description: 'Item model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Item, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: ObjectId,
    @param.filter(Item, {exclude: 'where'}) filter?: FilterExcludingWhere<Item>
  ): Promise<Item> {
    return this.itemRepository.findById(id, filter);
  }

  @patch('/item/{id}')
  @response(204, {
    description: 'Item PATCH success',
  })
  async updateById(
    @param.path.string('id') id: ObjectId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Item,
  ): Promise<void> {
    await this.itemRepository.updateById(id, item);
  }

  @put('/item/{id}')
  @response(204, {
    description: 'Item PUT success',
  })
  async replaceById(
    @param.path.string('id') id: ObjectId,
    @requestBody() item: Item,
  ): Promise<void> {
    await this.itemRepository.replaceById(id, item);
  }

  @del('/item/{id}')
  @response(204, {
    description: 'Item DELETE success',
  })
  async deleteById(@param.path.string('id') id: ObjectId): Promise<void> {
    await this.itemRepository.deleteById(id);
  }
}
