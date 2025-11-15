# .idx/dev.nix
{ pkgs, lib, ... }:

{
  # 📡 Channel selection
  channel = "stable-24.11";

  # 📦 Core packages for React Native + Firebase
  packages = [
    pkgs.nodejs
    pkgs.yarn
    pkgs.git
    pkgs.watchman       # required for React Native file watching
    pkgs.openjdk17      # Java for Android builds
    pkgs.gradle         # Android build system
    pkgs.firebase-tools # Firebase CLI
  ];

  # 🌍 Environment variables
  env = {
    NODE_ENV = "development";
    ANDROID_HOME = "/workspace/android-sdk";
    PATH = [
      "/workspace/android-sdk/emulator"
      "/workspace/android-sdk/platform-tools"
      "/workspace/android-sdk/tools"
    ];
    FIREBASE_PROJECT_ID = "demo-project"; # replace with your project ID
  };

  # 🧩 Extensions (VS Code style)
  idx.extensions = [
    "msjsdiag.vscode-react-native"
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "firebase.firebase-vscode"
  ];

  # ⚡ Previews (live reload for React Native apps)
  idx.previews = {
    enable = true;
    previews = {
      android = {
        command = [ "npx" "react-native" "run-android" ];
        cwd = "app";
        manager = "android";
        env = { API_URL = "http://10.0.2.2:3000"; };
      };
      ios = {
        command = [ "npx" "react-native" "run-ios" ];
        cwd = "app";
        manager = "flutter"; # iOS handled via simulator
      };
    };
  };

  # 🛠 Workspace lifecycle
  idx.workspace.onCreate = {
    yarn-install = "yarn install";
    default.openFiles = [ "App.js" ];
  };

  idx.workspace.onStart = {
    metro = "npx react-native start";
    firebase-emulators = "firebase emulators:start --only firestore,auth";
    default.openFiles = [ "App.js" ];
  };

  # 🗄 Services (optional backend support)
  services.postgres = {
    enable = true;
    enableTcp = true;
    package = pkgs.postgresql_15;
    extensions = [ "pgvector" ];
  };

  services.redis.enable = true;
  services.pubsub.enable = true;
}
