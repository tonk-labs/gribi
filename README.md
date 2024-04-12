```
.::..:-:::..............................................................
.::.:::............... ...........==........... ... .. .................
.:..................    ........:#@@+ ..........   .  . ................
.:.............                .+@@@%:    . .  .       .    ............
.:............   .  .   ..     -@@@@@+.      .         .    ............
.............        .    . . .+@@@@@%-   .     .     .       ..........
............                  :%@@@@@@*.     . .             .. .....  .
.........                     =@@@@@@@@- .          .            ..    .
........       .   .          _ .-.    _           .   .        ..    .
...........                  :_;: :   :_;             .      .     ..  
..........  ..:.   .--. .--. .-.: `-. .-.        .. .         .   ......
.........   -%@#: ' .; :: ..': :' .; :: :   .  ..       .       ...... .
........  .=@@@@: `._. ;:_;  :_;`.__.':_;                .       ....... 
...... . .*@@@@%: ..-. :.-==+++***##****++=-.    .       .        ...... 
.........=@@@@@@:  `._. .--======+++*++++==--:             .         . . 
........:#@@@@@@-.   .  ..:-----=========--::.        =@@-      .  .....
........=%@@@@@@=.. .       ..::-------::-.           -@@@=       . ....
.......:*%@@@@@@*. .   .        .+##*++:.            .=@@@@=    . ......
.......-#%%@@@@@%-        .      .+%%#-              :%@@@@%:.   .......
.......=##%%%%%%%*.             ..+%@%+.  . .       .#@@@@@@=   ........
......:+*#####%##*=.   .  .   .  .+###*:           .*%@@@@@@+.    ......
......:++********++=:           .-**##*-.. .      :+*#%%%%%#*:  .. .....
......-==++++++++==--:          :++***+=.       .-=+**######*=:..   ....
.....::--=======---::.          :=+**+=:       .:-==++*****+++=...  ....
....:.:::-----=+-:..        .             .    ..:--=++=+++====:........
:::::....-=+*%%%*-    .  .    .    . .   .      ..:--=--=+--=--:........
...:::::.:=+*#****:              .    .          . ..--==+=:-:..........
......::..-++****-.   .    . .                 .     .+###+:............
.:.:::.:::............       .  .                    :++*++-............
:::::::.........:::...........    ..  ....    ..... ...:--:.............
::::::::::::::...::::::..........................................::::...
:::::::::::::..::::::::::::........................................:::::
```

## Gribi is an SDK for building Trust Infrastructure.

Individuals and institutions communicate; our ability to do so underscores all shared flourishing and relies on a particular set of tools. You can think of these tools as a **communication infrastructure**. 

Thanks to advanced cryptography, we have powerful new tools that enable _expressive_ and _authoritative_ forms of communication. Some (including us) have started to call these new patterns **"trust infrastructure"**.

With trust infrastructure, individuals, institutions - and more recently, intelligences - can build deep and prosperous relationships that could not exist otherwise.

Here are a few examples:
- Anonymous, private DAOs for secret coordination
- On-chain hidden information mechanics
- Identity-based private networks
- Attribute-locked content
- Instant oracles for smoother on/offramping

Building trust infrastructure is hard. It requires deep technical know-how and strong interoperability between all nodes of a given system. This presents both technical problems and coordination problems. We designed Gribi to solve both these challenges.

## The Gribi interface

The Gribi interface allows for independent cryptosystems to more easily link together functionality without directly coordinating.

Gribi defines a simple interface through which the various nodes in a network may communicate with each other. These nodes pass messages through two primary formats: PCD and Signals. 
- **PCD** or "Proof-Carrying Data" is a term first coined by Starkware's Alessandro Chiesa and proposed as a general standard by 0xParc's PCD team. This format allows for the trivial federation of provable data and is highly composable. 
- **Signals** are more specific and used to transmit state to RootSystems in Gribi. **RootSystems** are interfaces that encapsulate the behavior of external networks or systems, such as a blockchain or S3 instance. This allows a PCD or other intermediary mechanism to "commit" to state, broadcast updates to other networks or make operational transforms over state in any datastore. 

## Modules in Gribi

In Gribi, a **module** is a predefined way of generating and sending proofs that represent an idiosyncratic "information behaviour", somewhat akin to packages. This behaviour could be a hidden information mechanic in an onchain game, but could be many other distinctive ways for information to propagate and information asymmetries to build up / erode. 

Modules are helpful because they abstract away complex behaviours, keep code clean and become quite powerful when they built on top of a RootSystem. Instead of spending months upskilling in the unstable ZK stack, ambitious developers can focus on their apps and let Gribi handle underlying cryptography.

Some examples of modules (existing, or yet-to-be built) are:

- Oblivious transfer
- Hidden movement
- Hidden loot generation
- Private procedurally-generated NFTs
- Paranoia devices

Modules are designed to be maximally composable and interoperable; they may consume other modules to achieve complex, nested behavior. This is possible as PCDs are universally composable. Furthermore, signals are designed to allow for composition within its RootSystem. This makes building modules easier, because modules can abstract complexity away from you, and the RootSystem itself will encapsulate a great deal of complexity. Using modules is even easier as there is no cryptographic knowledge required for install and use.

## Project status

Gribi is currently in alpha stage. It is rapidly changing, incomplete and may be unstable and insecure. We have opened it up for early feedback and value your efforts to build trust infrastructure conducive to our shared flourishing.

The best way to try out Gribi is to go to the gribi-playground. There are two walkthroughs available currently:

1) Writing a module
2) Using a module in MUD


