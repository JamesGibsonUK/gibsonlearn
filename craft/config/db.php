<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

 return array(
     '*' => array(
         'tablePrefix' => 'craft',
     ),
     '.dev' => array(
         'server' => 'localhost',
         'user' => 'homestead',
         'password' => 'secret',
         'database' => 'homestead',
     ),
     '.com' => array(
         'server' => 'localhost',
         'user' => 'forge',
         'password' => 'KwKoA1ATuxPpKEfTohU7',
         'database' => 'gibsonlearn',
     ),
 );
