// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Doughnut, Chart } from 'react-chartjs-2';
import walletActions from './walletActions';
import walletCurrencyValueResolver from './walletCurrencyValueResolver';
import './Wallet.css';

import type { Wallet as WalletType } from './walletState';
import BottomNavigation from '../bottomNavigation';

type Props = {
  wallets: Array<WalletType>,
  fetchWallet: () => void,
};

const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw(args) {
    originalDoughnutDraw.apply(this, ...args);

    const { width, height, ctx } = this.chart.chart;
    const { datasets } = this.chart.config.data;

    const fontSize = Math.floor(height / 114);
    ctx.font = `${fontSize}em Roboto`;
    ctx.textBaseline = 'middle';

    const sum = datasets[0].data.reduce((a, b) => a + b, 0);

    // TODO make currency & formatting dynamic
    const text = sum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'EUR',
    });
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
  },
});

export class Wallet extends Component<Props> {
  componentDidMount() {
    const { fetchWallet } = this.props;
    if (fetchWallet) {
      fetchWallet();
    }
  }

  getData() {
    const { wallets } = this.props;

    return {
      datasets: [
        {
          data: wallets.map((wallet: WalletType) =>
            walletCurrencyValueResolver.resolve(wallet.balance),
          ),
          backgroundColor: ['#19c3ed', '#47d6e2', '#62dfd9'],
          borderWidth: [0, 0, 0],
        },
      ],
      labels: wallets.map((wallet: WalletType) => wallet.currency),
      wallets,
    };
  }

  options = {
    circumference: 21 / 12 * Math.PI,
    rotation: 3 / 24 * Math.PI,
    cutoutPercentage: 60,
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label(tooltipItem: Object, data: Object) {
          const wallet: WalletType = data.wallets[tooltipItem.index];
          const walletValue = walletCurrencyValueResolver.resolve(
            wallet.balance,
            wallet.currency,
          );
          return `${walletValue} ${wallet.currency}`;
        },
      },
    },
  };

  render() {
    const data = this.getData();
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col className="wallet col-lg-4">
            <div className="top">
              <div className="text-right">
                <button type="button" className="btn btn-primary bmd-btn-icon">
                  <i className="material-icons">more_horiz</i>
                </button>
              </div>
              <Doughnut data={data} options={this.options} />
            </div>
          </Col>
        </Row>
        <div className="bottom-navigation">
          <BottomNavigation />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.wallet ? state.wallet.wallets : [],
});

const mapDispatchToProps = {
  fetchWallet: walletActions.walletFetchRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
