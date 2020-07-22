import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default function PostsFeed() {
    const [data, setData] = useState({
        loading: true,
        posts: []
    });

    async function fetchNext5Posts() {
        setData({ ...data, loading: true });

        // TODO
        // fetch next set of posts (use offset+limit),
        //  and define the variable `morePosts`
        const res = await axios.get(
            `${API_URL}/posts?offset=${data.posts.length}&limit=5`
        );

        const morePosts = res.data.rows;

        setData({
            loading: false,
            posts: [...data.posts, ...morePosts]
        });
    }

    useEffect(() => {
        fetchNext5Posts();
    }, []);

    return (
        <div className="PostsFeed">
            <h2>Recent posts</h2>
            {data.posts.map(post => {
                return (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p className="meta">
                            {moment(post.createdAt).format("DD-MM-YYYY")} &bull;{" "}
                            {/* {post.post_likes.length} likes &bull;{" "} */}
                            <span className="tags">
                                {post.tags.map(tag => {
                                    return (
                                        <React.Fragment key={tag.id}>
                                            <span className="Tag">{tag.tag}</span>{" "}
                                        </React.Fragment>
                                    );
                                })}
                            </span>
                        </p>
                    </div>
                );
            })}
            <p>
                {data.loading ? (
                    <em>Loading...</em>
                ) : (
                        <button onClick={fetchNext5Posts}>Load more</button>
                    )}
            </p>
        </div>
    );

}