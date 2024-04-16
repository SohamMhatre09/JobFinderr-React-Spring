package com.telusko.joblisting.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.telusko.joblisting.model.Post;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Component
public class SearchRepositoryImpl implements SearchRepository {

    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter converter;

    @Override
    public List<Post> findByText(String text) {
        final List<Post> posts = new ArrayList<>();

        MongoDatabase database = client.getDatabase("telusko");
        MongoCollection<Document> collection = database.getCollection("JobPost");

        // Construct the regular expression pattern for case-insensitive search
        Pattern pattern = Pattern.compile("^.*" + text + ".*$", Pattern.CASE_INSENSITIVE);

        // Construct the query to search across all fields
        Document query = new Document("$or",
                Arrays.asList(
                        new Document("techs", pattern),
                        new Document("desc", pattern),
                        new Document("profile", pattern)
                )
        );

        // Execute the query and iterate over the results
        collection.find(query).limit(5).forEach(doc -> posts.add(converter.read(Post.class, doc)));

        return posts;
    }
}
