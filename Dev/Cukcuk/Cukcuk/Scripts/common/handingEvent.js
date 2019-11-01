$(document).ready(function () {
    setTimeout(() => { var event = new HandlingEvent(); }, 0);
}, false);
class HandlingEvent {
	constructor() {
		this.fillColorRow();
        this.rowOnclick();
        this.alignContent();
        this.toggleButton();
	}
	/**
	 * Tô màu cho các hàng
	 * Created by NAQuan 31/10/2019
	 * */
	fillColorRow() {
		let count = 0;
		$("table tbody tr").each(function (index, item) {
			count++;
			if (count % 2 == 0) {
				$(this).addClass("color");
			}
		});
	}
	/**
	 * Khi nhấn một hàng thì tô màu hàng đó
	 * Created by NAQuan 31/10/2019
	 * */
	rowOnclick() {
        $('tbody tr').on('click', function (event) {
            if (event.ctrlKey) {
                if ($(this).attr('class') == 'clicked' || $(this).attr('class') == 'color clicked') {
                    $(this).removeClass('clicked');
                } else {
                    $(this).addClass('clicked');
                }
            } else {
                $('.clicked').removeClass('clicked');
                $(this).addClass('clicked');
            }
        });
    }

    /**
    * Hàm căn chỉnh nội dung
    * Created by: NAQuan 01/11/2019
    */
    alignContent() {
        $('td.text').css('text-align', 'left');
        $('td.number').css('text-align', 'right');
        $('td.day').css('text-align', 'center');
        $('td.tick').css('text-align', 'center');
    }

    /**
     * Hàm bật chức năng một nút
     * Created by: NAQuan 01/11/2019
     * */
    enableButton(name) {
        $(name).removeAttr('disabled');
        $(name).addClass('enable');
        $(name).removeClass('disable');
    }

    /**
    * Hàm tắt chức năng một nút
    * Created by: NAQuan 01/11/2019
    * */
    disableButton(name) {
        $(name).attr('disabled', 'disabled');
        $(name).addClass('disable');
        $(name).removeClass('enable');
    }

    /**
    * Hàm bật tắt chức năng các nút
    * Created by: NAQuan 01/11/2019
    * */
    toggleButton() {
        var employ = this;
        $('tbody tr').on('click', () => {
            let rowClicked = $('.clicked');
            if (rowClicked.length < 1) {
                employ.disableButton('#copy');
                employ.disableButton('#edit');
                employ.disableButton('#delete');
            }
            else {
                if (rowClicked.length == 1) {
                    employ.enableButton('#copy');
                    employ.enableButton('#edit');
                    employ.enableButton('#delete');
                } else {
                    if (rowClicked.length > 1) {
                        employ.disableButton('#copy');
                        employ.disableButton('#edit');
                        employ.enableButton('#delete');
                    }
                }
            }
        });
    }
}