const organizationModel = require("../models/organization.model");
const paginationObj = require("../enum/pagination.enum");

class organizationService {
  static async save(organization_data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.isValidOrganization(organization_data)) {
          reject({
            status: 422,
            message: "Insufficient Parameter",
          });
        } else {
          const alreadyPresent = await this.checkOrganizationExist(organization_data);
          if (alreadyPresent) {
            reject({
              status: 409,
              message: "organization already exists",
            });
          } else {
            organization_data = new organizationModel(organization_data);
            await organization_data.organizationID();
            await organization_data.save();
            resolve({
              status: 201,
              success: true,
              data: { id: organization_data._id },
            });
          }
        }
      } catch (error) {
        console.log("Error  while saving organization", error);
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
        if (term) {
          term = term.trim().toLowerCase();
          let searchTerms;
          searchTerms = term.trim().split(" ");
          searchTerms = searchTerms.filter((element) => {
            return element.trim();
          });
          let searchRegex = searchTerms.join("|");

          query["$or"] = [
            { name: { $regex: searchRegex, $options: "i" } },
          ];
        }
        let organization = [];
       
        const count = await organizationModel.countDocuments(query).exec();
        if (sort_by) {
         
          files = await organizationModel.find(query)
        
            .sort({ [sort_by]: asc })
            .skip(pageSize * pageNo)
            .limit(pageSize)
            .exec();
          
        } else {
          
          organization = await organizationModel.find(query)
            .skip(pageSize * pageNo)
            .limit(pageSize)
            .exec();
           
        }
        resolve({
          status: 200,
          count,
          page: pageNo,
          size: pageSize,
          data: organization,
          query: query,
          success: true,
          message:"fetched data sucessfully"
         
        });
      }  catch (error) {
        console.log("Error while fetching Group");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }

  static getById(organization_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const organization = await organizationModel.findById(organization_id).exec();
        resolve({
          status: 200,
          success: true,
          data: organization,
          message: "fetched data sucessfully",
        });
      } catch (error) {
        console.log("Error while fetching organization");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }

  static updateById(organization_id, organization_data) {
    return new Promise(async (resolve, reject) => {
      try {
        const oldOrganization = await organizationModel.findOne({
          _id: organization_id,
        }).exec();
        if (oldOrganization) {
          const updateData = await organizationModel.updateOne(
            {
              _id: organization_id,
            },
            { $set: organization_data }
          ).exec();

          resolve({
            status: 200,
            success: true,
            data: { _id: oldOrganization._id },
            message: "Organization Updated",
          });
        } else {
          reject({
            status: 404,
            message: "Organization not found",
            success: false,
          });
        }
      } catch (error) {
        console.log("Error while updating Organization");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }
  static deleteById(organization_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const organization = await organizationModel.findOne({
          _id: organization_id,
        }).exec();
        if (organization) {
          await organizationModel.deleteOne({ _id: organization_id }).exec();

          resolve({
            status: 201,
            success: true,
            message: "Organization deleted!!",
            data: { _id: organization._id },
          });
        } else {
          reject({
            message: "Organization not found..",
            status: 404,
            success: false,
          });
        }
      } catch (error) {
        console.log("Error while deleting Organization");
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  }
  static async checkOrganizationExist(organization_data) {
    const count = await organizationModel.countDocuments({

      name: organization_data.name,
    }).exec();
    return Boolean(count);
  }

  static isValidOrganization(organization_data) {
    return (
      (organization_data != null && Object.keys(organization_data).length === 0) ||

      !organization_data.name 
     
    );
  }
}

module.exports = organizationService;

