import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icons from '../../config/icons';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bannerView: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    height: 200,
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
  commentsDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  commentsView: {
    marginRight: '5%',
    marginLeft: '5%',
  },
  organizersTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  orgOuterView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    borderBottomWidth: 0.5,
  },
  commentsDetailView: {
    flex: 1,
    flexDirection: 'row',
  },
  commentsImageView: {
    marginRight: 20,
  },
  commentsName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  commentsEmail: {
    fontSize: 14,
  },
  commentsBody: {
    marginTop: 10,
    fontSize: 14,
  },
  profPicIcon: {
    width: 44,
    height: 44,
  },
  chatIcon: {
    width: 36,
    height: 36,
  },
  photosView: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
  },
  photoOuterView: {
    width: 244,
  },
  photoView: {
    marginTop: 10,
    borderWidth: 0.5,
  },
  photosTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photosTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  photoImage: {
    width: 244,
    height: 130,
  },
  photoTextView: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 170,
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
  postsView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  postCount: {
    fontSize: 19,
    color: '#DA5E42',
    fontWeight: '600',
  },
});

const Comments = ({route, navigation}) => {
  const {name, email, profPic} = route.params;
  const [comments, setComments] = useState();

  const loadPostsList = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(jsonResponse => setComments(jsonResponse))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadPostsList();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Comments" />
      </Appbar.Header>
      <FlatList
        data={[0]}
        renderItem={({dummyItem, dummyIndex}) => (
          <View>
            <View style={styles.nameView}>
              <View style={styles.commentsDetailView}>
                <View style={styles.commentsImageView}>
                  <Image style={styles.profPicIcon} source={profPic} />
                </View>
                <View style={styles.commentsNameView}>
                  <Text style={styles.commentsName}>{name}</Text>
                  <Text style={styles.commentsEmail}>{email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.commentsView}>
              <FlatList
                data={comments}
                keyExtractor={(item, index) => `banner-item-${index}`}
                showsHorizontalScrollIndicator={false}
                // initialNumToRender={2}
                removeClippedSubviews={false}
                renderItem={({item, index}) => (
                  <View style={styles.orgOuterView}>
                    <View style={styles.commentsDetailView}>
                      <View style={styles.commentsNameView}>
                        <Text style={styles.commentsName}>{item.name}</Text>
                        <Text style={styles.commentsEmail}>{item.email} </Text>
                        <Text style={styles.commentsBody}>{item.body} </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default Comments;
