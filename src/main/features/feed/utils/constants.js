import WorldIcon from "../../../../content/world.svg";
import LockIcon from "../../../../content/lock.svg";

// Constants Values
export const DEFAULT_MAX_POLL_OPTIONS = 4;
export const FeedFilterTypeEnum = {
  posts: 1,
  polls: 2,
  docs: 3,
  tagged: 4,
  Department: 5,
  photos: 6,
  videos: 7,
};

// Enums
export const PostReferenceType = Object.freeze({
  MAIN_FEED: 1,
  GROUP: 2,
  PROJECTS: 3,
  TIMELINE: 4,
});

export const ReactionType = Object.freeze({
  NoReaction: 0,
  Like: 1,
  Celebrate: 2,
  Support: 3,
  Love: 4,
  Insightful: 5,
  Curious: 6,
});

export const PostType = Object.freeze({
  DEFAULT: 1,
  POLL: 2,
  getTitlePlaceHolder: (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PostType.DEFAULT:
        return "What's on your mind";
      case PostType.POLL:
        return "Ask something...";
    }
  },
  isPollType: (type) => type === PostType.POLL,
});

export const PollType = Object.freeze({
  DEFAULT: 1,
  PICTURE: 2,
});

export const PostPrivacyType = Object.freeze({
  PUBLIC: 1,
  PRIVATE: 2,
  EXTERNAL: 3,
  getPostTypeIcon: (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case PostPrivacyType.PUBLIC:
        return WorldIcon;
      case PostPrivacyType.PRIVATE:
        return LockIcon;
      case PostPrivacyType.EXTERNAL:
        return LockIcon;
    }
  },
});
// export async function myFunction() {
// 	var txt = "";
// 	try {
// 		await $.ajax({
// 			url: "http://localhost:3000/",
// 			error: function () {
// 				txt = "Unable to retrieve webpage source HTML";
// 			},
// 			success: function (response) {
// 				console.log(response, "MyTEXT", "response")
// 				response = $.parseHTML(response);
// 				$.each(response, function (i, el) {
// 					txt=el
// 					if (el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined") {
// 						txt += $(el).attr("name") + "=" + ($(el).attr("content") ? $(el).attr("content") : ($(el).attr("value") ? $(el).attr("value") : "")) + "<br>";
// 						console.log($(el).attr("name"), "=", ($(el).attr("content") ? $(el).attr("content") : ($(el).attr("value") ? $(el).attr("value") : "")), el, "MyTEXT");
// 					}
// 				});
// 			},
// 			complete: function () {
// 				txt = txt
// 				// document.getElementById("demo").innerHTML = txt;
// 			}
// 		});
// 	}
// 	catch (err) {
// 		console.log(err, "MyTEXT")
// 		txt = err
// 	}

// 	return txt
// 	console.log(txt, "MyTEXT")
// }
// let abc = async () => {
// 	let ress = await myFunction()
// 	console.log(ress, "MyTEXT")
// }
// console.log(abc(), "MyTEXT")
