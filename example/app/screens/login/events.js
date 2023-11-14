import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
const {width} = Dimensions.get('window');
import {connect} from 'react-redux';
import Icons from '../../config/icons';
import MyDrawer from '../../components/MyDrawer';
import {CHANGE_DRAWER} from '../../action-types';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bannerView: {
    flexDirection: 'row',
    height: 200,
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerCountView: {
    position: 'absolute',
    top: 150,
    left: width - 60,
    backgroundColor: 'white',
  },
  bannerCountText: {
    padding: 5,
  },
  selfActTileImgIco: {
    // overflow: 'hidden',
    width: width,
    height: 200,
  },
  titleView: {
    marginLeft: '5%',
    marginTop: '10%',
  },
  infoTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
  },
  infoDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  organizersView: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: 20,
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
  orgDetailView: {
    flex: 1,
    flexDirection: 'row',
  },
  orgImageView: {
    marginRight: 20,
  },
  orgName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  orgEmail: {
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
    borderBottomWidth: 0.5,
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
    paddingTop: 10,
    borderWidth: 0.3,
  },
  postCount: {
    fontSize: 19,
    color: '#DA5E42',
    fontWeight: '600',
  },
  postDesc: {
    alignSelf: 'center',
  },
});

const Events = props => {
  const {navigation} = props;

  const [imageList, setImageList] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [posts, setPosts] = useState([]);

  const loadImageList = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(jsonResponse => setImageList(jsonResponse))
      .catch(error => console.log(error));
  };

  const loadOrginizersList = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(jsonResponse => setOrganizers(jsonResponse))
      .catch(error => console.log(error));
  };

  const loadPostsList = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(jsonResponse => setPosts(jsonResponse))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadImageList();
    loadOrginizersList();
    loadPostsList();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={[0]}
        renderItem={({dummyItem, dummyIndex}) => (
          <View>
            <View style={styles.bannerView}>
              <FlatList
                data={imageList}
                keyExtractor={(item, index) => `banner-item-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
                pagingEnabled
                initialNumToRender={10}
                renderItem={({item, index}) => (
                  <View style={styles.imageView}>
                    <View>
                      <Image
                        resizeMode={'stretch'}
                        source={{uri: item.url}}
                        style={styles.selfActTileImgIco}
                      />
                      <View style={styles.bannerCountView}>
                        <Text style={styles.bannerCountText}>
                          {index + 1}/ 10
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.titleView}>
              <Text style={styles.infoTitle}>Clean Sea shore</Text>
              <Text style={styles.infoDesc}>
                Galle Fort, Southern province, Sri Lanka
              </Text>
            </View>
            <View style={styles.organizersView}>
              <Text style={styles.organizersTitle}>Organizers</Text>
              <FlatList
                data={organizers}
                keyExtractor={(item, index) => `banner-item-${index}`}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
                renderItem={({item, index}) => (
                  <View style={styles.orgOuterView}>
                    <View style={styles.orgDetailView}>
                      <View style={styles.orgImageView}>
                        <Image
                          style={styles.profPicIcon}
                          source={Icons.profPic}
                        />
                      </View>
                      <View style={styles.orgNameView}>
                        <Text style={styles.orgName}>{item.name}</Text>
                        <Text style={styles.orgEmail}>{item.email} </Text>
                      </View>
                    </View>
                    <View style={styles.orgChatView}>
                      <View style={styles.orgImageView}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('comments', {
                              name: item.name,
                              email: item.email,
                              profPic: Icons.profPic,
                            })
                          }>
                          <Image style={styles.chatIcon} source={Icons.chat} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.photosView}>
              <View style={styles.photosTitleView}>
                <Text style={styles.photosTitle}>Photos</Text>
                <Button
                  onPress={() =>
                    navigation.navigate('photos', {imageList: imageList})
                  }
                  textColor={'#DA5E42'}>
                  All photos {'->'}
                </Button>
              </View>
              <FlatList
                data={imageList}
                keyExtractor={(item, index) => `banner-item-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
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
            </View>
            <View style={styles.postsView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('posts', {posts: posts})}>
                <Text style={styles.postCount}>{posts.length}</Text>
                <Text style={styles.postDesc}>Posts</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <MyDrawer navigation={navigation} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    imageList: state.common.imageList,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    showDrawer: () => {
      dispatch({type: CHANGE_DRAWER, payload: {visible: true}});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
