const express = require("express");
const router = express.Router();

const { designList } = require("./designList");
const { designDetail, getCount, updateViewCount, changeToProject } = require("./designDetail");
const { getLikeDesign, likeDesign, unlikeDesign } = require("./likeDesign");
const { designView } = require("./designView");
const { designStep, designCardDetail } = require("./designStep");
const { designIssue, designIssueDetail } = require("./designIssue");
const { createIssue, updateIssue, updateIssueStatus, deleteIssue } = require("./createIssue");
const { createIssueComment, deleteIssueComment } = require("./designIssueCmt");
const auth = require("../../middlewares/auth");
const insertThumbnail = require("../../middlewares/insertThumbnail");
const tokenDecoded = require("../../middlewares/tokenDecoded");
const getDesignList = require("../../middlewares/getDesignList");
const { createDesign } = require("./createDesign");
const { createDesignView } = require("./createDesignView");
const uploadDesign = require("../../middlewares/uploadDesign");
const stringToNumber = require("../../middlewares/stringToNumber");
const stringToBoolean = require("../../middlewares/stringToBoolean");
const { createBoard, getBoardList, updateBoard, deleteBoard } = require("./designBoard");
const { createCard, getCardList, updateTitle, updateContent, getCardDetail, updateImages, updateSources, deleteCard } = require("./designCard");
const { deleteDesign } = require("./deleteDesign");
const { getCardComment, createCardComment, deleteCardComment } = require("./designCardCmt");
const { getTopList } = require("./topList");
const { updateDesignInfo } = require("./updateDesign");

router.get("/designList/:page/:sorting?/:cate1?/:cate2?/:keyword?", designList, getDesignList);
router.get("/designDetail/:id", tokenDecoded, designDetail);
router.get("/designDetail/:id/view", designView);
router.get("/designDetail/:id/step", designStep);
router.get("/designDetail/:id/cardDetail/:card_id", designCardDetail);

router.get("/designDetail/:id/getBoardList", getBoardList);
router.get("/designDetail/:id/getCardList", getCardList);
router.get("/designDetail/getCardDetail/:cardId", getCardDetail);

// 디자인 좋아요 기능 관련
router.get("/getLike/:id", auth, getLikeDesign);
router.post("/like/:id", auth, likeDesign);
router.post("/unlike/:id", auth, unlikeDesign);

// 조회수
router.get("/getCount/:id", getCount);
router.post("/updateViewCount/:id", updateViewCount);

router.post("/createDesign", auth, uploadDesign, stringToNumber, stringToBoolean, createDesign);
router.post("/createDesignView/:id", auth, createDesignView);
router.post("/updateDesignInfo/:id", auth, insertThumbnail, stringToNumber, updateDesignInfo);
router.delete("/deleteDesign/:id", auth, deleteDesign);
router.post("/designDetail/:id/createBoard", auth, stringToNumber, createBoard);
router.post("/designDetail/updateBoard/:board_id", auth, updateBoard);
router.delete("/designDetail/:design_id/deleteBoard/:board_id", auth, deleteBoard);

router.post("/designDetail/:id/:boardId/createCard", auth, createCard);
router.post("/designDetail/updateCardTitle/:cardId", auth, updateTitle);
router.post("/designDetail/updateCardContent/:cardId", auth, updateContent);
router.post("/designDetail/updateCardImages/:cardId", auth, uploadDesign, stringToNumber, updateImages);
router.post("/designDetail/updateCardSources/:cardId", auth, uploadDesign, stringToNumber, updateSources);
router.delete("/designDetail/deleteCard/:board_id/:card_id", auth, deleteCard);

// 디자인 issue 관련
router.get("/designDetail/:id/issue", designIssue);
router.get("/designDetail/:id/issueDetail/:issue_id", designIssueDetail);
router.post("/designDetail/:id/createIssue", auth, createIssue);
router.post("/designDetail/:id/updateIssue/:issue_id", auth, updateIssue);
router.post("/designDetail/:id/updateIssueStatus/:issue_id", auth, updateIssueStatus);
router.delete("/designDetail/:id/deleteIssue/:issue_id", auth, deleteIssue);

// comment 관련
router.get("/designDetail/:id/getCardComment/:card_id", getCardComment);
router.post("/designDetail/:id/createCardComment/:card_id", auth, createCardComment);
router.delete("/designDetail/:id/deleteCardComment/:card_id/:comment_id", auth, deleteCardComment);
router.post("/designDetail/:id/issue/:issue_id/createComment", auth, createIssueComment);
router.delete("/designDetail/:id/issue/:issue_id/deleteComment/:comment_id", auth, deleteIssueComment);

// 블로그형 디자인 프로젝트형으로 변경
router.post("/changeToProject/:id", auth, changeToProject);

// top 5개 리스트 가져오기 (메인용)
router.get("/TopList/:page", getTopList, getDesignList);

module.exports = router;
