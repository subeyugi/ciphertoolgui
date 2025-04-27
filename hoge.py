s = "･－ －･･･ －･－･ －･･ ･ ･･－･ －－･ ････ ･･ ･－－－ －･－ ･－･･ －－ －･ －－－ ･－－･ －－･－ ･－･ ･･･ － ･･－ ･･･－ ･－－ －･･－ －･－－ －－･･"
t = "abcdefghijklmnopqrstuvwxyz"
for e, f in zip(list(t), s.split()):
    print(e, f.replace(" ", "　").replace("･", "・").replace("－", "－"))