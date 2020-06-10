---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.ts
---
import {
    sequelize,
    Sequelize,
    BaseModel
} from '../../../base/baseModel'
import { BuildOptions, Model, Association } from 'sequelize/types';

export interface I<%= h.inflection.camelize(name) %> extends BaseModel {

}

export type I<%= h.inflection.camelize(name) %>Static = typeof Model & {
    new(values?: object, options?: BuildOptions): I<%= h.inflection.camelize(name) %>;
}

function init() {
    const <%= h.inflection.camelize(name) %> = <I<%= h.inflection.camelize(name) %>Static>sequelize.define('tbl_<%= h.inflection.underscore(name) %>', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        deletedAt: { type: 'TIMESTAMP' }
    }, {
            underscored: false,
            freezeTableName: true,
            paranoid: false,
            defaultScope: {
                attributes: { exclude: ['deletedAt'] }
            }
        });

    return <%= h.inflection.camelize(name) %>;
}

const <%= h.inflection.camelize(name) %>Model = init();

export { <%= h.inflection.camelize(name) %>Model }
