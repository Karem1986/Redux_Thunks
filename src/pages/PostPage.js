import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment"; //to display the date the post was written 
import ReactMarkdown from "react-markdown"; //to format the post contents 

import { selectPostAndComments } from "../store/postPage/selectors"
import { fetchPost } from "../store/postPage/actions";

export default function PostPage() {
    const dispatch = useDispatch();
    const { id } = useParams(); //gives the id of the blog post 
    const renderLoadingMessages = useSelector(selectPostAndComments)

    useEffect(() => {
        dispatch(fetchPost(id));
    }, [dispatch, id]);


    return (
        <div>
            {!renderLoadingMessages ? (
                <p>Loading...</p>
            ) : (
                    <div>
                        <h1>{renderLoadingMessages.post.title}</h1>
                        <p>{renderLoadingMessages.post.developer.name}</p>
                        {moment(renderLoadingMessages.post.createdAt).format("DD-MM-YYYY")} &bull;{" "}
                        <span className="tags">

                            {renderLoadingMessages.post.tags.map(tag => {
                                return (
                                    <React.Fragment key={tag.id}>
                                        <span className="Tag">{tag.tag}</span>{" "}
                                    </React.Fragment>
                                );
                            })}
                        </span>
                        <ReactMarkdown source={renderLoadingMessages.post.content} />

                        <h2>Comments</h2>
                        {renderLoadingMessages.comments.rows.length === 0 ? (
                            <p>
                                <em>No comments left behind yet :(</em>
                            </p>
                        ) : (
                                renderLoadingMessages.comments.rows.map(comment => {
                                    return (
                                        <div key={comment.id}>
                                            <p>{comment.text}</p>
                                            <p className="meta">
                                                By <strong>{comment.developer.name}</strong> &bull;{" "}
                                                {moment(comment.createdAt).format("DD-MM-YYYY")}{" "}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                    </div>
                )}
        </div>
    );
}
