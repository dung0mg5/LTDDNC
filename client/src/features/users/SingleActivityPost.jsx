import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import useMoreText from './MoreText';
import MoreText from './MoreText';

const Interaction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const IconReacts = styled.View`
  flex-direction: row;
`;

const Reacts = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ContainerReact = styled.View`
  width: 10px;
  height: 10px;
  margin-left: 6px;
  background-color: ${props => props.bgColor || '#d9d9d9'};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export default function SingleActivityPost({post}) {
  return (
    <Pressable
      style={{
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
      }}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <Text
          style={{
            color: '#666',
            fontWeight: '500',
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
            }}>
            Nguyen Toan
          </Text>{' '}
          reposted this
        </Text>

        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 50,
            backgroundColor: '#6C6C6C',
          }}
        />
        <Text
          style={{
            color: '#666',
            fontWeight: '600',
          }}>
          1w
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
          marginTop: 10,
        }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
          source={require('../../../assets/images/example.png')}
        />

        <MoreText>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          voluptas tenetur ducimus, laborum, quos, quas quidem quae quia
          quibusdam Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Harum culpa quam tempore provident quo pariatur autem quos laudantium
          sunt dolorum praesentium voluptatem, est odio dolore eveniet soluta
          molestiae exercitationem delectus?
        </MoreText>
      </View>
      <Interaction>
        <Reacts>
          <IconReacts>
            <ContainerReact bgColor="#508DE2">
              <Image source={require('../../../assets/icons/like.png')} />
            </ContainerReact>
            <ContainerReact bgColor="#098D0E">
              <Image source={require('../../../assets/icons/celebrate.png')} />
            </ContainerReact>
            <ContainerReact bgColor="#D17655">
              <Image source={require('../../../assets/icons/love.png')} />
            </ContainerReact>
          </IconReacts>
          <Text
            style={{
              fontWeight: '600',
              color: '#6C6C6C',
            }}>
            1,048
          </Text>
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 50,
              backgroundColor: '#6C6C6C',
            }}
          />
          <Text
            style={{
              color: '#6C6C6C',
              fontWeight: '600',
            }}>
            100 comment
          </Text>
        </Reacts>
      </Interaction>
    </Pressable>
  );
}
