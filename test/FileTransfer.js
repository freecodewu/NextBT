const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const Web3 = require("web3");

describe("FileTransfer", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFileTransferFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = Web3.utils.toWei("0.1", "ether");

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const FileTransfer = await ethers.getContractFactory("FileTransfer");
    const fileTransfer = await FileTransfer.deploy({ value: lockedAmount });

    return { fileTransfer, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { fileTransfer, owner } = await loadFixture(deployFileTransferFixture);

      expect(await fileTransfer.owner()).to.equal(owner.address);
    });
  });

  describe("UploadFile", function () {
    it("Should transfer the funds to the owner", async function () {
      const { fileTransfer, lockedAmount, owner } = await loadFixture(
        deployFileTransferFixture
      );

      const options = {value: ethers.utils.parseEther("1")};

      const cid = "hello world";
      await expect(fileTransfer.uploadFile(cid, options)).to.emit(fileTransfer, "FileIdCreated");
    });
  });
});
