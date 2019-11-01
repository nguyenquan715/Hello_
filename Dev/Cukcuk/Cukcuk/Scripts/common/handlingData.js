$(document).ready(function () {
	var employee = new Employee('KH001', 'Nguyễn Anh Quân', new Date(1999, 11, 21), 'Nghệ An', '0915314743', 'nguyenanhquan715@gmail.com', 3211020211112, 'Không có ghi chú', true);
	employee.loadData(100);
}, false);

class Employee {
	constructor(id, name, birthday, address, telephone, email, money, note, outWorked) {
		this.id = id;
		this.name = name;
		this.birthday = birthday;
		this.address = address;
		this.telephone = telephone;
		this.email = email;
		this.money = money;
		this.note = note;
		this.outWorked = outWorked;
	}
	/**
	 * Hàm tạo dữ liệu
	 * Created by NAQuan 31/10/2019
	 * */
	fakeData() {
		var data = '<tr>' +
			'<td class="text">' + this.id + '</td>' +
            '<td class="text">' + this.name + '</td>' +
            '<td class="day">' + this.formatDate(this.birthday) + '</td>' +
			'<td class="text">' + this.address + '</td>' +
			'<td class="number">' + this.telephone + '</td>' +
            '<td class="text">' + this.email + '</td>' +
            '<td class="number">' + this.formatMoney(this.money) + '</td>' +
			'<td class="text">' + this.note + '</td>' +
			'<td class="tick"><input type="checkbox"></td>' +
			+'</tr>';
		return data;
	}
	/**
	 * Hàm đổ dử liệu vào bảng
	 * Created by NAQuan 31/10/2019
	 */
	loadData(row) {
		var data = this.fakeData();
		var k = false;
		for (let i = 0; i < row; i++) {
            $('tbody').append(data);
		}
    }

    /**
     * Hàm định dạng dữ liệu Date thành dd/MM/yyyy
     * Người tạo: NAQuan 01/11/2019
     * */
    formatDate(date) {
        let day = date.getDate();
        if (day <= 9) {
            day = '0' + day;
        }
        let month = date.getMonth();
        if (month <= 9) {
            month = '0' + month;
        }
        let year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    /**
     * Hàm định dạng dữ liệu tiền tệ
     * Created by: NAQuan 01/11/2019
     * */
    formatMoney(money) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

}