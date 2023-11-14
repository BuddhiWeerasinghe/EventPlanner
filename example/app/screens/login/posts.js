/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, FlatList} from 'react-native';
import Icons from '../../config/icons';
import {Appbar} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleView: {
    marginLeft: '5%',
    marginTop: '10%',
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FCF3F0',
  },
  commentsTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
  },
  postsView: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: 20,
  },
  postsOuterView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  postsDetailView: {
    flex: 1,
    flexDirection: 'row',
  },
  postsName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  postsEmail: {
    fontSize: 14,
  },
});

const Posts = ({route, navigation}) => {
  const {posts} = route.params;
  return (
    <SafeAreaView style={styles.root}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Posts" />
      </Appbar.Header>
      <FlatList
        data={[0]}
        renderItem={({dummyItem, dummyIndex}) => (
          <View style={styles.postsView}>
            <FlatList
              data={posts}
              keyExtractor={(item, index) => `banner-item-${index}`}
              showsHorizontalScrollIndicator={false}
              // initialNumToRender={2}
              removeClippedSubviews={false}
              renderItem={({item, index}) => (
                <View
                  style={[
                    styles.postsOuterView,
                    {backgroundColor: index % 2 === 0 ? '#FCF3F0' : '#FFFFFF'},
                  ]}>
                  <View style={styles.postsDetailView}>
                    <View style={styles.postsNameView}>
                      <Text style={styles.postsName}>{item.title}</Text>
                      <Text style={styles.postsEmail}>{item.body} </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Posts;
