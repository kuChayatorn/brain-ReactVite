import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'
import { Font } from 'three/examples/jsm/Addons.js'

export default function Button({ onClick, icon, ...prop }) {
    const button = useRef()
    useFrame(() => {
        ThreeMeshUI.update()
    })
    useEffect(() => {
        button.current.setupState({
            state: 'hovered',
            attributes: {
                offset: 0.05,
                backgroundColor: new THREE.Color(0x999999),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff)
            }
        })
        button.current.setupState({
            state: 'idle',
            attributes: {
                offset: 0.035,
                backgroundColor: new THREE.Color(0xffffff),
                backgroundOpacity: 1,
                fontColor: new THREE.Color(0xffffff)
            }
        })
        button.current.setupState({
            state: 'selected',
            attributes: {
                offset: 0.02,
                backgroundColor: new THREE.Color(0x777777),
                fontColor: new THREE.Color(0x222222)
            }
        })
        button.current.setState('idle')

        const loader = new THREE.TextureLoader();
        loader.load(icon, (texture) => {
            button.current.set({ backgroundTexture: texture });
        });

    }, [])

    console.log(prop.width !== undefined)
    return (
        <block
            args={[
                {
                    width: prop.w !== undefined ? prop.w : 0.7, // Adjusted width
                    height: prop.h !== undefined ? prop.h : 0.4, // Adjusted height
                    justifyContent: 'center',
                    borderRadius: prop.borderRadius !== undefined ? prop.borderRadius : 0.075,
                    fontSize: prop.fontSize !== undefined ? prop.fontSize : 0.5,
                    fontColor: 'white',
                    fontFamily: './../Roboto-msdf.json',
                    fontTexture: './../Roboto-msdf.png'
                }
            ]}>

            <block
                ref={button}
                onPointerEnter={() => button.current.setState('hovered')}
                onPointerLeave={() => button.current.setState('idle')}
                onPointerDown={() => button.current.setState('selected')}
                onPointerUp={() => {
                    button.current.setState('hovered')
                    onClick()
                }}
                args={[
                    {
                        width: prop.w !== undefined ? prop.w * 0.6 : 0.7, // Adjusted width
                        height: prop.h !== undefined ? prop.h * 0.6 : 0.4, // Adjusted height
                        justifyContent: 'center',
                        borderRadius: prop.borderRadius !== undefined ? prop.borderRadius * 0.6 : 0.075,
                        fontSize: prop.fontSize !== undefined ? prop.fontSize : 0.5,
                        fontColor: 'white',
                        fontFamily: './../Roboto-msdf.json',
                        fontTexture: './../Roboto-msdf.png',
                        backgroundSize: "contain",
                        backgroundColor: new THREE.Color(0x777777),
                        backgroundOpacity: 1
                    }
                ]}
            >
            </block>
        </block>
    )
}
