import React, { useEffect, useState } from "react"

export default function Chatbot() {
  
  useEffect(() => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'https://apis.people.com.ai/webchat-script/api/peoplechat/e2135453-40c4-4abf-81f9-2d6d498c9d53', false);
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.responseText);
    document.createElement('script');

    eval(response.content.replace(/textToReplace.people.com.ai/g, "chat.people.com.ai"));
  }, [])

  return(
    <>
    </>
  )

}