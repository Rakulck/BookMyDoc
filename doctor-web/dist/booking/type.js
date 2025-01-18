"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPaymentStatus = exports.IBookingStatus = void 0;
var IBookingStatus;
(function (IBookingStatus) {
    IBookingStatus["PENDING"] = "pending";
    IBookingStatus["CONFIRMED"] = "confirmed";
    IBookingStatus["CANCELED"] = "canceled";
    IBookingStatus["COMPLETED"] = "completed";
})(IBookingStatus || (exports.IBookingStatus = IBookingStatus = {}));
var IPaymentStatus;
(function (IPaymentStatus) {
    IPaymentStatus["PENDING"] = "pending";
    IPaymentStatus["CANCELED"] = "canceled";
    IPaymentStatus["COMPLETED"] = "completed";
})(IPaymentStatus || (exports.IPaymentStatus = IPaymentStatus = {}));
//# sourceMappingURL=type.js.map