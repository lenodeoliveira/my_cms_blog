import sequelize from '@/infra/db/mysqldb/helpers/connection'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'

//users
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: string
    declare name: string
    declare email: string
    declare role: CreationOptional<string>
    declare status: CreationOptional<number>
    declare password: string
    declare passwordResetToken: string
    declare passwordResetExpires: Date
    declare createdAt: Date
    declare updatedAt: Date
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: true,
            defaultValue: 'user'
        },
        status: {
            type: new DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        passwordResetToken: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        passwordResetExpires: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize
    }
)

//contents
export class Content extends Model<InferAttributes<Content>, InferCreationAttributes<Content>> {
    declare id: string
    declare userId: string
    declare title: string
    declare slug: string
    declare body: string
    declare image: CreationOptional<string>
    declare published: number
    declare createdAt: Date
    declare updatedAt: Date
}

Content.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: new DataTypes.CHAR(36),
            allowNull: false
        },
        title: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        slug: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: new DataTypes.STRING(255),
            allowNull: true
        },
        body: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        published: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'contents',
        sequelize
    }
)

export class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
    declare id: string
    declare name: string
    declare ext: string
    declare url: string
    declare mime: string
    declare size: number
    declare folderPath: string
    declare createdAtById: CreationOptional<string>
    declare updatedById: CreationOptional<string>
    declare createdAt: Date
    declare updatedAt: Date
}

File.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        ext: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        url: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        mime: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        size: {
            type: new DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        folderPath: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        createdAtById: {
            type: new DataTypes.CHAR(36),
            allowNull: false
        },
        updatedById: {
            type: new DataTypes.CHAR(36),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'files',
        sequelize
    }
)

User.hasMany(Content)
Content.belongsTo(User)

User.hasMany(File)
File.belongsTo(User)