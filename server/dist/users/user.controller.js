"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const customerdto_1 = require("./dto/customerdto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    add(dto) {
        return this.userService.add(dto);
    }
    delete(id, userId) {
        return this.userService.delete(userId, id);
    }
    modify(newData) {
        return this.userService.modify(newData);
    }
    getall(id, page) {
        return this.userService.getall(id, page);
    }
    lookup(userid, query) {
        return this.userService.lookup(userid, query);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerdto_1.CustomerDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)(':userid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerdto_1.CustomerDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "modify", null);
__decorate([
    (0, common_1.Get)(':id/:page'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getall", null);
__decorate([
    (0, common_1.Get)('search/:page/:userid/:query?/'),
    __param(1, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "lookup", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map