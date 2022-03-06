import { useEffect, useState } from "react";

function PostVideo({ message }) {
  const [video, setVideo] = useState("");

  useEffect(() => {
    if (message) {
      const handleVideo = () => {
        let findLink = message.split(" ");
        for (let i = 0; i < findLink.length; i++) {
          if (
            findLink[i].includes("https://youtube") ||
            findLink[i].includes("https://www.youtube")
          ) {
            let embed = findLink[i].replace("watch?v=", "embed/");
            setVideo(embed.split("&")[0]);
            findLink.splice(i, 1);
          }
        }
      };
      handleVideo();
    }
  }, [message]);

  return (
    <>
      {video ? (
        <iframe
          src={video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video}
          width="100%"
          height="300px"
        ></iframe>
      ) : null}
    </>
  );
}

export default PostVideo;
