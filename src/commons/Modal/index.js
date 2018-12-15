import {Modal} from 'antd';

export default function ShowModal(money, xacNhan){
  Modal.confirm({
    title: 'Xác nhận',
    content: 'Để đăng câu trả lời, bạn phải chi ' + money + ' HHC',
    onOk() {
      xacNhan();
    }
  });
};
