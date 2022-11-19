import { ImageResponse } from "@vercel/og";
import React from "react";

export const config={
  runtime: "experimental-edge",
};

export default function handler(req){
  const {searchParams} = new URL(req.url);
  const content = searchParams.get("content") ?? "lorem ipsum";

  return new ImageResponse(
    (
      <div 
        style={{  
            display: "flex",
            width: "1200px",
            height:"630px",
            backgroundColor:"#f5f7fa"
        }}>
        <svg
          viewBox="0 0 160 160"
          style={{
            position: "absolute",
            top:"30px",
            right:"30px",
          }}
        >
          <path  fill="#478ac9"
            d="M14.5,7.3c0,4-3.3,7.3-7.3,7.3S0,11.2,0,7.3S3.3,0,7.3,0S14.5,3.3,14.5,7.3z M7.3,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S11.2,24.2,7.3,24.2z M31.5,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S35.5,0,31.5,0z M55.8,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3S63,11.2,63,7.3S59.7,0,55.8,0z M80,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S84,0,80,0z M104.2,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S108.2,0,104.2,0z M128.5,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S132.5,0,128.5,0z M152.7,0c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S156.7,0,152.7,0z M31.5,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S35.5,24.2,31.5,24.2zM55.8,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S59.7,24.2,55.8,24.2z M80,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S84,24.2,80,24.2z M104.2,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S108.2,24.2,104.2,24.2z M128.5,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S132.5,24.2,128.5,24.2z M152.7,24.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S156.7,24.2,152.7,24.2z M7.3,48.5c-4,0-7.3,3.3-7.3,7.3S3.3,63,7.3,63s7.3-3.3,7.3-7.3S11.2,48.5,7.3,48.5z M31.5,48.5c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S35.5,48.5,31.5,48.5zM55.8,48.5c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S59.7,48.5,55.8,48.5z M80,48.5c-4,0-7.3,3.3-7.3,7.3S76,63,80,63s7.3-3.3,7.3-7.3S84,48.5,80,48.5z M104.2,48.5c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S108.2,48.5,104.2,48.5zM128.5,48.5c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S132.5,48.5,128.5,48.5z M152.7,48.5c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S156.7,48.5,152.7,48.5z M7.3,72.7C3.3,72.7,0,76,0,80s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S11.2,72.7,7.3,72.7z M31.5,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S35.5,72.7,31.5,72.7z M55.8,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3S63,84,63,80S59.7,72.7,55.8,72.7z M80,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3S84,72.7,80,72.7z M104.2,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S108.2,72.7,104.2,72.7zM128.5,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S132.5,72.7,128.5,72.7z M152.7,72.7c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3S156.7,72.7,152.7,72.7z M7.3,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C14.5,100.3,11.2,97,7.3,97z M31.5,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C38.8,100.3,35.5,97,31.5,97zM55.8,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C63,100.3,59.7,97,55.8,97z M80,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C87.3,100.3,84,97,80,97z M104.2,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C111.5,100.3,108.2,97,104.2,97z M128.5,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C135.8,100.3,132.5,97,128.5,97z M152.7,97c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C160,100.3,156.7,97,152.7,97z M7.3,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C14.5,124.5,11.2,121.2,7.3,121.2z M31.5,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C38.8,124.5,35.5,121.2,31.5,121.2z M55.8,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C63,124.5,59.7,121.2,55.8,121.2z M80,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C87.3,124.5,84,121.2,80,121.2z M104.2,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C111.5,124.5,108.2,121.2,104.2,121.2z M128.5,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C135.8,124.5,132.5,121.2,128.5,121.2z M152.7,121.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C160,124.5,156.7,121.2,152.7,121.2z M7.3,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C14.5,148.8,11.2,145.5,7.3,145.5z M31.5,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C38.8,148.8,35.5,145.5,31.5,145.5z M55.8,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C63,148.8,59.7,145.5,55.8,145.5z M80,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C87.3,148.8,84,145.5,80,145.5z M104.2,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C111.5,148.8,108.2,145.5,104.2,145.5z M128.5,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C135.8,148.8,132.5,145.5,128.5,145.5z M152.7,145.5c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3c4,0,7.3-3.3,7.3-7.3C160,148.8,156.7,145.5,152.7,145.5z"
          ></path>
        </svg>
        <div style={{
          backgroundColor:"#478ac9",
          width:"500px",
          height:"150px",
          position:"absolute",
          left:"55px",
          bottom:"55px"
        }}> 
        </div>
          <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            width:"1080px",
            height:"510px",
            backgroundColor:"#e0e5eb",
            position: "absolute",
            right:"60px",
            fontSize: 40,
            top:"60px",
            filter: "drop-shadow(5px 2px 5px rgb(45,50,50,1))"
          }}>
          <p
          style={{
            width:"1000px",
            textOverflow:"-",
            overflowWrap: "anywhere",
            overflow:"hidden",
            wordBreak:"break-word",
            hyphens:"auto",
            textAlign:"center", 
            lineClamp:"9",
            maxHeight:"10em",
            lineHeight:"1.1em",
            filter:"none",
            fontFamily:""
          }}>
            {content}
          </p>
          </div>
        </div>
    )
  );
}