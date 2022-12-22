import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocsComposerEnums } from "../constant";
import { handleCloseComposer } from "../store/slice";
import CreateArticle from "./article";
import CreateCategory from "./category";
import CreateCourse from "./course";
import CreateEbook from "./ebook";
import CreateQuizz from "./quizz";
import CreateTedtalk from "./tedtalks";
import CreateVideo from "./video";

const DocumentComposers = ({ referenceId, referenceType }) => {
	const dispatch = useDispatch();
	const composerState = useSelector(
		state => state.eLearningSlice.isOpenComposers
	);

	let { category, courses, ebook, quizz, tedtalks, article, video } = composerState;

	const handleCloseOpenComposer = key => {
		dispatch(handleCloseComposer(key));
	};


	return (
		<>
				<CreateCategory
					isOpen={category}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.category)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateCourse
					isOpen={courses}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.courses)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateEbook
					isOpen={ebook}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.ebook)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateQuizz
					isOpen={quizz}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.quizz)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateTedtalk
					isOpen={tedtalks}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.tedtalks)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateArticle
					isOpen={article}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.article)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
				<CreateVideo
					isOpen={video}
					handleClose={() =>
						handleCloseOpenComposer(DocsComposerEnums.video)
					}
					referenceId={referenceId}
					referenceType={referenceType}
				/>
		</>
	);
};

export default DocumentComposers;
