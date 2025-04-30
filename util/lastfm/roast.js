require("dotenv").config();
module.exports = async function(topArtists, topAlbums) {
    let prompt = "Roast the top 10 artists albums the user has listened to most for the last 365 days. Be mean. Be concise and create 3 small paragraphs in total. DO NOT CREATE ONE PARAGRAPH PER ARTIST OR ALBUM.\n"

    prompt += "Top artists and their playcounts:\n"
    topArtists.forEach(topArtist => {
        prompt += `${topArtist.name} (${topArtist.playcount})\n`
    });
    
    prompt += "Top albums and their playcounts:\n"
    topAlbums.forEach(topAlbum => {
        prompt += `${topAlbum.artist} - ${topAlbum.name} (${topAlbum.playcount})\n`
    })
    let answer = "";
    await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
        method: `POST`,
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            "model": `deepseek/deepseek-chat-v3-0324:free`,
            "messages": [
                {
                    "role": `system`,
                    "content": prompt
                }
            ],
            "max_tokens": 400
        })
    }).then(response => response.json()).then(data => {
        answer = data.choices[0].message.content;
    }).catch(error => {
        console.error(error);
    });
    return answer;
}