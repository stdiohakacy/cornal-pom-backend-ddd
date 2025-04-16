grpcurl -plaintext \
  -import-path ./src/presentation/grpc/protos \
  -proto ./src/presentation/grpc/protos/group.proto \
  -d '{
    "group": {
      "name": "Neo4j Dev Team",
      "description": "Group for graph lovers",
      "creatorId": "bb842e65-ece7-4b0a-a81c-fa5f738a2438"
    }
  }' \
  localhost:6000 group.v1.GroupInfoService/CreateGroup