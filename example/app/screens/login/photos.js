import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import Icons from '../../config/icons';
import {Appbar} from 'react-native-paper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // paddingBottom: 80,
  },
  photosView: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
  },
  photoOuterView: {
    width: '100%',
  },
  photoView: {
    marginTop: 10,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
  },
  photosTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  photoImage: {
    width: '50%',
    height: 130,
  },
  photoTextView: {
    width: '50%',
    padding: 20,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  photoDesc: {
    fontSize: 14,
    marginTop: 10,
  },
  listView: {
    marginBottom: 40,
  },
});

const Photos = ({route, navigation}) => {
  const {imageList} = route.params;
  return (
    <SafeAreaView style={styles.root}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Photos" />
      </Appbar.Header>
      <View style={styles.photosView}>
        <FlatList
          data={imageList}
          keyExtractor={(item, index) => `banner-item-${index}`}
          style={styles.listView}
          renderItem={({item, index}) => (
            <View style={styles.photoOuterView}>
              <View style={styles.photoView}>
                <Image
                  resizeMode={'stretch'}
                  source={{uri: item.url}}
                  style={styles.photoImage}
                />
                <View style={styles.photoTextView}>
                  <Text style={styles.photoTitle}>Photo title</Text>
                  <Text style={styles.photoDesc}>{item.title}</Text>
                </View>
              </View>
            </View>
          )}
        />
        <Text>3</Text>
      </View>
    </SafeAreaView>
  );
};
export default Photos;
