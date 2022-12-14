


// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0<0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";

interface Molecule_Nft {
    function balanceOf(address sender) external view returns(uint);
}


contract MoleculeFactory_ERC721 is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, ERC721Burnable {
  
   string private _nftName;
   string private _nftSymbol;
   string private _nftTokenUri;
   address private _owner;
   address moleculeNftAddress = 0x02FC2a1541d61229171C2B7e0A534376d1522acc;
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event tokenIdValue (uint tokenIdValue);
    
    mapping (address => uint256) internal ownerToId;

    constructor(string memory nftName,string memory nftSymbol, string memory nftTokenUri,address owner) ERC721(nftName, nftSymbol) {
        
        _nftName = nftName;
        _nftSymbol = nftSymbol;
        _nftTokenUri=nftTokenUri;
        _owner = owner;
    }

    modifier onlyKyc {
         Molecule_Nft M =  Molecule_Nft(moleculeNftAddress);
        bool status =false;
        uint balance = M.balanceOf(msg.sender);
        if(balance >= 1 ){
            status = true;
        }
         require(status == true , "Molecule contract : NOT WHITELISTED ADDRESS");
        _;
    } 

    modifier onlyOwner {
        require(msg.sender==_owner);
        _;
    } 

    function safeMint(address to) public onlyKyc  {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
       _safeMint(to, tokenId);
        ownerToId[to] = tokenId;
        emit tokenIdValue(tokenId);
    }
    
    function getTokenID(address from) public view returns (uint256) {
        return (ownerToId[from]);
    }

    function pause() public onlyOwner  {
        _pause();
    }

    function unpause() public onlyOwner  {
        _unpause();
    }

    function _baseURI() internal view override returns (string memory) {
        return _nftTokenUri;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function isExist(uint256 tokenId) public view returns (bool){
       return  _exists(tokenId);
        
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}



contract MoleculeFactory {

    MoleculeFactory_ERC721 private ERC721Contract;
    address public owner;
    
   // user to deployed contract address list  
   mapping(address => address[]) private userDeployedContractList;

   event contractCreation(address contractAddress);
    
  constructor() {
    owner = msg.sender;
    }

  modifier onlyOwner {
        require(msg.sender==owner);
        _;
    } 
 function createContract(string memory _name, string memory _symbol, string memory _tokenUri) public returns(address){
     ERC721Contract  = new MoleculeFactory_ERC721(_name, _symbol,_tokenUri,msg.sender);
     userDeployedContractList[msg.sender].push(address(ERC721Contract));
     emit contractCreation(address(ERC721Contract));
     return address(ERC721Contract);
 }
 
 
 function totalDeployedContractList(address _account) public view  returns(address[] memory){
     return userDeployedContractList[_account];
 }
 function totalDeployedContractNumber(address _account)  public view returns(uint){
     uint value = userDeployedContractList[_account].length;
     return(value);
 }

}


