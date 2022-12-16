<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SignUpController extends AbstractController
{
    public function signup(): Response
    {
        return $this->render('sign/signup.html.twig', []);
    }

    public function login(): Response
    {
        return $this->render('sign/login.html.twig', []);
    }

    public function nopass(): Response
    {
        return $this->render('sign/nopass.html.twig', []);
    }
    public function newpass(): Response
    {
        return $this->render('sign/newpass.html.twig', []);
    }
}