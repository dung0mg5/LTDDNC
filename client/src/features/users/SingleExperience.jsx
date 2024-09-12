import {Text, View, Image} from 'react-native';
import React from 'react';
import MoreText from './MoreText';
import {calculateExperience, formatDate} from '../../utils/helper';

export default function SingleExperience({item}) {
  return (
    <View
      style={{
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 10,
      }}>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri: item.company.avatar.url,
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <Text style={{fontSize: 18, fontWeight: 700}}>{item.jobTitle}</Text>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 500}}>
            {item.company.name}
          </Text>

          {item.typeEmployment && (
            <>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 50,
                  backgroundColor: '#000',
                }}
              />
              <Text style={{fontSize: 15, fontWeight: 500}}>
                {item.typeEmployment}
              </Text>
            </>
          )}
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text
            style={{
              color: '#666',
              fontWeight: 600,
            }}>
            {formatDate(item.start, {
              year: 'numeric',
              month: 'short',
            })}{' '}
            -{' '}
            {formatDate(item.end, {
              year: 'numeric',
              month: 'short',
            })}
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
              fontWeight: 600,
            }}>
            {calculateExperience(item.start, item.end)}
          </Text>
        </View>

        {item?.location && (
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Text
              style={{
                color: '#666',
                fontWeight: 600,
              }}>
              {item.location}
            </Text>
            {item.locationType && (
              <>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 50,
                    backgroundColor: '#666',
                  }}
                />
                <Text style={{fontWeight: 600, color: '#666'}}>
                  {item.locationType}
                </Text>
              </>
            )}
          </View>
        )}

        {item.description && (
          <View
            style={{
              marginTop: 10,
            }}>
            <MoreText>{item.description}</MoreText>
          </View>
        )}
        {item.skills?.length > 0 && (
          <Text
            style={{
              fontWeight: 800,
              marginTop: 10,
            }}>
            Skills:{' '}
            <Text
              style={{
                fontWeight: 600,
              }}>
              {item.skills.join(', ')}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}
