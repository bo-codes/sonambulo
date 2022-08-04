import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acquirePosts } from "../../../store/posts";
import PostCard from "../Elements/PostCard";
// import "../../../index.css";

// import "../Elements/eventCard.css";
// import "../../User/dashboard.css";
// import "./events.css";

function Posts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(acquirePosts());
    console.log("getting posts");
  }, [dispatch]);


  return (
    <main
      style={{
        margin: "0px",
        padding: "0px",
      }}
    >
      <h1
        style={{
          marginTop: "30px",
          marginLeft: "5vw",
          fontFamily: "Eina-bold",
          color: "#191923",
          fontSize: "80px",
        }}
      >
        Posts
      </h1>

      <div className="body">
        <div
          className="eventsHolder"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            // justifyContent: "center",
            marginTop: "10px",
            Left: "0px",
          }}
        >
          {posts &&
            posts
              // .filter((event) => {
              //   if (startDate === endDate) return true;
              //   if (
              //     new Date(event.date) > new Date(startDate) &&
              //     new Date(event.date) < new Date(endDate)
              //   )
              //     return true;
              //   return false;
              // })
              // .filter((event) => {
              //   return checkCategories(event);
              // })
              // .filter((event) => {
              //   return event.name.match(new RegExp(search, "i"));
              // })
              // .sort((a, b) => {
              //   if (sortBy === "name") {
              //     if (a.name < b.name) return -1;
              //     if (a.name > b.name) return 1;
              //     return 0;
              //   }
              //   if (sortBy === "date") {
              //     return new Date(a.date) - new Date(b.date);
              //   }
              //   return a - b;
              // })
              .map((post) => {
                return (
                  <div
                    key={post.id}
                    style={{
                      height: "333px",
                      width: "363px",
                      margin: "11px",
                    }}
                  >
                    <PostCard post={post} />
                  </div>
                );
              })}
        </div>
      </div>
    </main>
  );
}

export default Posts;
