import React, { Component } from 'react';
// import axios from 'axios';
import NavbarComponent from '../../components/navbar/NavbarComponent';
import PayInfo from '../../components/payment/PayInfo';
import PersonalInfo from '../../components/payment/PersonalInfo';
import ButtonPanel from '../../components/splitpanel/ButtonPanel';
import PanelLeft from '../../components/splitpanel/PanelLeft';
import PanelRight from '../../components/splitpanel/PanelRight';
import FooterComponent from '../../components/footer/FooterComponent';
import PayMethod from '../../components/payment/PayMethod';
import { connect } from "react-redux";
import { getVNPay } from "../../redux/actions/order";

class PaymentPage extends Component {
  handlePayOrder = async () => {
    try {
        console.log('Payment start');
        // const response = await axios.post('/order/create_payment_url', {
        //     orderType: 'topup',
        //     amount: 10000,
        //     orderDescription: 'gogo',
        //     bankCode: 'NCB',
        //     language: 'vn'
        // });

        // const vnpUrl = response.data.vnpUrl;
        await this.props.getVNPay((localStorage.getItem("dataShowtimePrice")* localStorage.getItem("seatOrder").split(",").length)*23000);
        // console.log('Payment success:', response.data);
        const { vnpUrl } = this.props;
        console.log("VNPRUL: ", vnpUrl)
        window.location.href = vnpUrl;

    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
    }
};

    render() {
        
        return (
            <>
                <NavbarComponent />
                <PanelLeft title="Payment Info" body={<PayInfo />}>
                    <PanelRight title="Personal Info" body={<PersonalInfo />} />
                </PanelLeft>
                <PanelLeft
                    title="Choose a Payment Method"
                    body={<PayMethod />}
                    panel={
                        <ButtonPanel
                            goButtonLeft="/order-page"
                            buttonLeft="Previous step"
                            buttonRight="Pay your order"
                            //goButtonRight="/ticket-result"
                            onClick={this.handlePayOrder}
                        />
                    }
                ></PanelLeft>
                <FooterComponent />
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    movie: state.movie,
    vnpUrl: state.order.vnpUrl,
  });
  const mapDispatchToProps = {
    getVNPay
  };
  
  export default 
    connect(mapStateToProps, mapDispatchToProps)(PaymentPage);