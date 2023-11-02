import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, usePathname, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { CompassIcon, MessageSquare, ThumbsUp } from 'lucide-react-native';

import { useColorScheme } from 'react-native';
import tw from '@/lib/tailwind';
import { SkipProfileBtn } from '@/components/ui/SkipProfileBtn';
import { useStore } from '@/store/discoverProfileStore';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // console.log('colorScheme :', colorScheme);
  const pathname = usePathname();
  console.log('pathname :', pathname);
  const { currentUser } = useStore();
  // console.log('currentUser from layout:', currentUser);

  // console.log(' :', );

  return (
    <>
      {pathname === '/' && <SkipProfileBtn />}
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

          headerShown: true,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => (
              <CompassIcon size={24} name='code' color={color} />
            ),
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <CompassIcon
                      size={24}
                      color={'#e3e3e3'}
                      // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name='likes'
          options={{
            title: 'Likes',
            tabBarIcon: ({ color }) => <ThumbsUp size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name='matches'
          options={{
            title: 'Знайомства',
            tabBarIcon: ({ color }) => (
              <MessageSquare size={24} color={color} />
            ),
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name='info-circle'
                      size={25}
                      color={'#e3e3e3'}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name='account'
          options={{
            title: 'Профіль',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name='info-circle'
                      size={25}
                      color={'#e3e3e3'}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
