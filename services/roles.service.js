const rolesModel = require("../models/roles.model");
const paginationObj = require("../enum/pagination.enum");

class rolesService {
  static async save(roles_data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.isValidRoles(roles_data)) {
          reject({
            status: 422,
            message: "Insufficient Parameter",
          });
        } else {
          const alreadyPresent = await this.checkRolesExist(roles_data);
          if (alreadyPresent) {
            reject({
              status: 409,
              message: "Roles already exists",
            });
          } else {
            roles_data = new rolesModel(roles_data);
            await roles_data.rolesID();
            await roles_data.save();
            resolve({
              status: 201,
              success: true,
              data: { id: roles_data._id },
            });
          }
        }
      } catch (error) {
        console.log("Error  while saving roles", error);
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }
  static getAll(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let { sort_by, term } = req.query;
        const pageSize = parseInt(req.query.size || paginationObj.size);
        const pageNo = parseInt(req.query.page || paginationObj.page);
        const asc = req.query.asc && req.query.asc == "true" ? 1 : -1;
        delete req.query.page;
        delete req.query.asc;
        delete req.query.sort_by;
        delete req.query.size;
        delete req.query.term;
        let query = {};
        if (req.query != undefined) {
          for (const key in req.query) {
            query[key] = req.query[key];
          }
        }

        let roles = [];
        const count = await rolesModel.countDocuments(query).exec();
        if (sort_by) {
          files = await rolesModel.find(query)
            .sort({ [sort_by]: asc })
            .skip(pageSize * pageNo)
            .limit(pageSize)
            .exec();
        } else {
          roles = await rolesModel.find(query)
            .skip(pageSize * pageNo)
            .limit(pageSize)
            .exec();
        }
        resolve({
          status: 200,
          data: roles,
          success: true,
          count,
          page: pageNo,
          size: pageSize,
          query: query,
        });
      } catch (error) {
        console.log("Error while fetching roles");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }

  

  static getById(roles_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const roles = await rolesModel.findById(roles_id).exec();
        resolve({
          status: 200,
          success: true,
          data: roles,
          message: "fetched data sucessfully",
        });
      } catch (error) {
        console.log("Error while fetching roles");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }

  static updateById(roles_id, roles_data) {
    return new Promise(async (resolve, reject) => {
      try {
        const oldRoles = await rolesModel.findOne({
          _id: roles_id,
        }).exec();
        if (oldRoles) {
          const updateData = await rolesModel.updateOne(
            {
              _id: roles_id,
            },
            { $set: roles_data }
          ).exec();

          resolve({
            status: 200,
            success: true,
            data: { _id: oldRoles._id },
            message: "Roles Updated",
          });
        } else {
          reject({
            status: 404,
            message: "Roles not found",
            success: false,
          });
        }
      } catch (error) {
        console.log("Error while updating roles");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }
  static deleteById(roles_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const roles = await rolesModel.findOne({
          _id: roles_id,
        }).exec();
        if (roles) {
          await rolesModel.deleteOne({ _id: roles_id }).exec();

          resolve({
            status: 201,
            success: true,
            message: "Roles deleted!!",
            data: { _id: roles._id },
          });
        } else {
          reject({
            message: "Roles not found..",
            status: 404,
            success: false,
          });
        }
      } catch (error) {
        console.log("Error while deleting roles");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }

  static async checkRolesExist(roles_data) {
    const count = await rolesModel.countDocuments({
     
      name: roles_data.name,
    }).exec();
    return Boolean(count);
  }

  static isValidRoles(roles_data) {
    return (
      (roles_data != null && Object.keys(roles_data).length === 0) ||
      !roles_data.name 
      
    );
  }
}

module.exports = rolesService;

