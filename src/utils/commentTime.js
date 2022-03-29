export function commentTime(time) {
    Date.prototype.toLocaleString = function () {
        function addZero(num) {
            return num < 10 ? "0" + num : num;
        }
        return this.getFullYear() + "/" + addZero(this.getMonth() +
            1) + "/" + addZero(this.getDate()) + " " + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
    };
    let date = new Date(time);
    return date.toLocaleString();
}