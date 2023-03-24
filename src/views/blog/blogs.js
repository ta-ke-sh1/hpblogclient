import React from "react";
import { useFetch } from "../../hooks/useFetch";
import Card from "../../components/card";

export default function BlogList() {
    const { error, isLoaded, data } = useFetch("http://localhost:5000/blog");

    if (error !== null) {
        return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
        return (
            <>
                <h1>Loading</h1>
            </>
        );
    }

    console.log(data);

    //  const blogs = data.map((blog) => (
    //      <Card
    //          key={blog.title}
    //          props={{
    //              title: blog.title,
    //              image: blog.image,
    //              date: blog.date,
    //          }}
    //      />
    //  ));

    return (
        <>
            <div>Testing</div>
        </>
    );
}
