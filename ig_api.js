function uploadReel(videoUrl, caption="", audioName=""){
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `OAuth ${process.env.IG_TOKEN}`)
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("media_type", "REELS");
    urlencoded.append("video_url", videoUrl);
    urlencoded.append("share_to_feed", true);
    urlencoded.append("is_ai_generated", true);
    urlencoded.append("caption", caption);
    urlencoded.append("audio_name", audioName);
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };
    
    return fetch(`https://graph.instagram.com/v25.0/${process.env.IG_USER_ID}/media`, requestOptions)
    .then((response) => response.json())
}

function publishReel(reelId){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.IG_TOKEN}`);

    const raw = JSON.stringify({
    "creation_id": reelId
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    return fetch(`https://graph.instagram.com/v25.0/${IG_USER_ID}/media_publish`, requestOptions)
    .then((response) => response.json())
}