"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = exports.validateTime = void 0;
const validateTime = (timeValue) => {
    let [hours, minutes] = timeValue?.split(':');
    hours = +hours;
    minutes = +minutes;
    if (hours > 24 || hours <= 0) {
        hours = 0;
    }
    if (minutes > 60 || minutes < 0) {
        minutes = 0;
    }
    return { hours, minutes };
};
exports.validateTime = validateTime;
const formatTime = (time) => {
    if (!time) {
        return '00:00';
    }
    let [hours, minutes] = time?.split(':');
    const ampm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 || 12;
    minutes = String(minutes);
    return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`;
};
exports.formatTime = formatTime;
//# sourceMappingURL=utils.js.map