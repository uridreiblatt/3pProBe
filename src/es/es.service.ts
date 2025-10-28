import { Injectable } from '@nestjs/common';
import { CreateEDto } from './dto/create-e.dto';
import { UpdateEDto } from './dto/update-e.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EsService {
  constructor(private readonly esService: ElasticsearchService) {}

  async create(_createEDto: CreateEDto) {
    const uid = uuid();
    const result = await this.esService.index({
      index: 'tasks_info',
      id: uid,
      document: {
        _createEDto,
      },
    });
    return result;
  }

  async findAll() {
    const result = await this.esService.search({
      index: 'tasks_info',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return result;
  }

  async findOne(id: string) {
    const result = await this.esService.search({
      index: 'tasks_info',
      body: {
        query: {
          match: {
            _id: id,
          },
        },
      },
    });

    return result;
  }

  async update(id: string, _updateEDto: UpdateEDto) {
    return await this.esService.update({
      index: 'tasks_info',
      id: 'my_document_id',
      doc: {
        _updateEDto,
      },
    });
  }

  async remove(id: string) {
    return await this.esService.delete({
      index: 'my_index',
      id: id,
    });
  }
}
