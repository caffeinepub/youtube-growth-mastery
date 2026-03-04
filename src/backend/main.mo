import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Lead = {
    name : Text;
    email : Text;
    timestamp : Int;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.email, lead2.email);
    };
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    category : Text;
    date : Text;
    excerpt : Text;
    content : Text;
    imageUrl : Text;
  };

  module BlogPost {
    public func compareByDateDesc(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Text.compare(post2.date, post1.date);
    };
  };

  let leads = Map.empty<Text, Lead>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  var nextPostId = 1;

  public shared ({ caller }) func submitLead(name : Text, email : Text) : async () {
    if (leads.containsKey(email)) { Runtime.trap("Duplicate email not allowed") };
    let lead : Lead = {
      name;
      email;
      timestamp = Time.now();
    };
    leads.add(email, lead);
  };

  public query ({ caller }) func getLeads() : async [Lead] {
    leads.values().toArray();
  };

  public shared ({ caller }) func addPost(title : Text, category : Text, date : Text, excerpt : Text, content : Text, imageUrl : Text) : async Nat {
    let post : BlogPost = {
      id = nextPostId;
      title;
      category;
      date;
      excerpt;
      content;
      imageUrl;
    };
    blogPosts.add(nextPostId, post);
    nextPostId += 1;
    post.id;
  };

  public query ({ caller }) func getPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareByDateDesc);
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [BlogPost] {
    blogPosts.values().toArray().filter(
      func(p) { Text.equal(p.category, category) }
    );
  };

  public shared ({ caller }) func initialize() : async () {
    for (post in samplePosts().values()) {
      blogPosts.add(nextPostId, post);
      nextPostId += 1;
    };
  };

  func samplePosts() : [BlogPost] {
    [
      {
        id = 1;
        title = "2024 YouTube Algorithm Changes";
        category = "Algorithm Updates";
        date = "2024-03-05";
        excerpt = "How the latest changes impact creators";
        content = "Full content here...";
        imageUrl = "image1.jpg";
      },
      {
        id = 2;
        title = "Maximizing AdSense Revenue";
        category = "Monetization";
        date = "2024-02-20";
        excerpt = "Tips for boosting your income";
        content = "Full content...";
        imageUrl = "image2.jpg";
      },
      {
        id = 3;
        title = "Best Camera for Vlogging";
        category = "Gear Reviews";
        date = "2024-01-15";
        excerpt = "Our top picks for creators";
        content = "Full content...";
        imageUrl = "image3.jpg";
      },
      {
        id = 4;
        title = "Shorts Monetization Explained";
        category = "Monetization";
        date = "2024-04-10";
        excerpt = "How to earn from short-form videos";
        content = "Full content here...";
        imageUrl = "image4.jpg";
      },
      {
        id = 5;
        title = "Understanding YouTube Analytics";
        category = "Algorithm Updates";
        date = "2024-03-28";
        excerpt = "Make data work for you";
        content = "Full content...";
        imageUrl = "image5.jpg";
      },
      {
        id = 6;
        title = "Microphone Showdown: Best for Beginners";
        category = "Gear Reviews";
        date = "2024-02-01";
        excerpt = "Budget-friendly options";
        content = "Full content...";
        imageUrl = "image6.jpg";
      },
    ];
  };
};
