{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python311Packages.poetry
    # Force environment rebuild to fix missing _socket module
  ];
}