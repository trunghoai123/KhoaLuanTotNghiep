const customerModel = require("../models/customer.model")

class CustomerService {

    static getCustomerByUserId = async ({MaTaiKhoan}) =>{
        try{
            const customer = await customerModel.findOne({MaTaiKhoan});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: customer
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get customer error',
                }
                
            }
        }
    }

    static getCustomerByPhone = async ({SoDienThoai}) =>{
        try{
            const customer = await customerModel.findOne({SoDienThoai});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: customer
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get customer error',
                }
                
            }
        }
    }
    static addCustomer = async ({TenKhachHang , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email, MaTaiKhoan})=>{
        try{
            const newCustomer = await customerModel.create({
                TenKhachHang , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email, MaTaiKhoan
            })
            if(newCustomer){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newCustomer,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'add customer error',
                }
            }
        }
    }
    static updateCustomer = async ({id,TenKhachHang , SoDienThoai , DiaChi , NgaySinh, GioiTinh })=>{
        try{
            const customer = await customerModel.findOneAndUpdate({
                _id: id
            },{
                TenKhachHang , SoDienThoai , DiaChi , NgaySinh, GioiTinh 
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: customer,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update customer error',
                }
            }
        }
    }
    static deleteCustomer = async ({id})=>{
        try{
            await customerModel.deleteOne({ _id: id })
           
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: "Xóa thành công",
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'delete customer error',
                }
            }
        }
    }
}

module.exports = CustomerService