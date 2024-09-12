/* eslint-disable react-hooks/exhaustive-deps */
import {Image, Modal, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ReactBox from './ReactBox';
import {calculateTimeAgoV2} from '../../utils/helper';
import {getComments, getReactsPost} from '../../services/apiPost';

const ContainerPost = styled.View`
  margin-top: 10px;
  flex-direction: column;
  background-color: #fff;
`;

const HeaderPost = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: #eaeaea;
`;

const Avatar = styled.Image`
  border-width: 1px;
  border-color: #e9e9e9;
  border-radius: 40px;
  overflow: hidden;
  margin-left: 20px;
  width: 60px;
  height: 60px;
`;

const Post = styled.View`
  flex-direction: column;
`;

const User = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Information = styled.View`
  width: 200px;
`;

const Follow = styled.View`
  flex-direction: row;
  margin-right: 20px;
  align-items: center;
  width: 80px;
  justify-content: space-around;
`;

const Interaction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  height: 50px;
`;

const IconReacts = styled.View`
  flex-direction: row;
  gap: -8px;
`;

const Reacts = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ContainerReact = styled.View`
  width: 25px;
  height: 25px;
  background-color: ${props => props.bgColor || '#d9d9d9'};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

// function Suggested() {
//   return (
//     <View
//       style={{
//         height: 50,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: '#EAEAEA',
//         marginLeft: 10,
//         marginRight: 10,
//       }}>
//       <Text
//         style={{
//           fontSize: 16,
//           fontWeight: '500',
//         }}>
//         Suggested
//       </Text>
//       <View
//         style={{
//           flexDirection: 'row',
//           width: 100,
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Image
//           style={{
//             marginLeft: 20,
//           }}
//           source={require('../../../assets/icons/dot.png')}
//         />
//         <Image
//           style={{
//             width: 20,
//             height: 20,
//           }}
//           source={require('../../../assets/icons/close.png')}
//         />
//       </View>
//     </View>
//   );
// }

function SinglePost({post}) {
  const [reacts, setReacts] = useState([]);
  const [comments, setComments] = useState([]);

  async function getReacts() {
    const {data} = await getReactsPost({postId: post._id});

    setReacts(data.data);
  }

  async function fetchComments() {
    const {data} = await getComments({postId: post._id});

    setComments(data.data);
  }

  useEffect(() => {
    getReacts();
    fetchComments();
  }, []);

  return (
    <ContainerPost>
      {/* <Suggested /> */}
      <Post>
        <HeaderPost>
          <User>
            <Avatar source={require('../../../assets/images/default.png')} />
            <Information
              style={{
                width: 200,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  marginLeft: 10,
                }}>
                {post.owner.fullName}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: '500',
                }}>
                {post.owner.headline}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: '500',
                  color: '#666',
                  marginTop: 5,
                }}>
                {calculateTimeAgoV2(post.createdAt)}
              </Text>
            </Information>
          </User>

          {/* {post.owner._id !== profile.user.authenticatedUser._id && (
            <Follow>
              <Image
                style={{
                  width: 15,
                  height: 15,
                }}
                source={require('../../../assets/icons/plus.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#2D64BC',
                }}>
                Follow
              </Text>
            </Follow>
          )} */}
        </HeaderPost>
        <View>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
              fontSize: 16,
            }}>
            {post.content}
          </Text>
          {post?.media && post.media.resource_type === 'image' ? (
            <Image
              style={{
                width: '100%',
                height: 400,
              }}
              resizeMode="cover"
              source={{uri: post.media.url}}
            />
          ) : null}
          {/* {post?.media && post.media.resource_type === 'video' ? (
            <View>
              <VideoPlayer
                video={{uri: post.media.url}}
                videoWidth={200}
                videoHeight={200}
                defaultMuted={true}
                autoplay={false}
                loop={false}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  marginTop: 10,
                }}
              />
            </View>
          ) : null} */}
        </View>
        <Interaction>
          <Reacts>
            <IconReacts>
              <ContainerReact bgColor="#508DE2">
                <Image source={require('../../../assets/icons/like.png')} />
              </ContainerReact>
              <ContainerReact bgColor="#098D0E">
                <Image
                  source={require('../../../assets/icons/celebrate.png')}
                />
              </ContainerReact>
              <ContainerReact bgColor="#D17655">
                <Image source={require('../../../assets/icons/love.png')} />
              </ContainerReact>
            </IconReacts>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#6C6C6C',
              }}>
              {reacts.length || 0}
            </Text>
          </Reacts>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text
              style={{
                color: '#6C6C6C',
                fontWeight: '600',
              }}>
              {`${comments?.length || 0} comments`}
            </Text>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 50,
                backgroundColor: '#6C6C6C',
              }}
            />
            <Text
              style={{
                marginRight: 10,
                color: '#6C6C6C',
                fontWeight: '600',
              }}>
              10 reposts
            </Text>
          </View>
        </Interaction>
      </Post>
      <ReactBox post={post} reacts={reacts} />
    </ContainerPost>
  );
}

export default SinglePost;
