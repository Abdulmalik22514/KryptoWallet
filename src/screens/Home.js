import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainLayout} from '.';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS, dummyData, icons, SIZES} from '../constants';
import {BalanceInfo, IconTextButton} from '../components';

const Home = ({getCoinMarket, getHoldings, myHoldings, coins}) => {
  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );

  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View style={styles.walletInfoContainer}>
        {/* Balance Info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{marginTop: 50}}
        />
        {/* Buttons */}
        <View style={styles.walletInfoButtons}>
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{flex: 1, height: 40, marginRight: SIZES.radius}}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{flex: 1, height: 40}}
            onPress={() => console.log('Withdraw')}
          />
        </View>
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header - Wallet Info section */}
        {renderWalletInfoSection()}
        {/* Chart */}

        {/* Top crypto */}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  walletInfoContainer: {
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.gray,
  },
  walletInfoButtons: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: -15,
    paddingHorizontal: SIZES.radius,
  },
});

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
